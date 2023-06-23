import { ImportUseCasesInterface } from '@core/app/factories/import-usecases.factory';
import { ProductsUseCasesInterface } from '@core/app/factories/product-usecases.factory';
import { validateFilename } from '@core/utils/validate-filename';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { createReadStream, createWriteStream, unlinkSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { createGunzip } from 'node:zlib';

const streamPipeline = promisify(pipeline);

@Injectable()
export class SyncProductsService {
  private readonly COODESH_FILES_URL: string;
  private readonly logger = new Logger(SyncProductsService.name);
  private products = [];

  constructor(
    @Inject('ProductUseCases')
    private productUseCases: ProductsUseCasesInterface,
    @Inject('ImportUseCases') private importUseCases: ImportUseCasesInterface,
    public configService: ConfigService,
  ) {
    this.COODESH_FILES_URL = this.configService.get('COODESH_FILES_URL');
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sync() {
    this.logger.log('SYNC STARTED!');

    const fetchFiles = await fetch(`${this.COODESH_FILES_URL}/index.txt`);

    const filesPlainText = await fetchFiles.text();
    const files = filesPlainText.trim().split('\n');

    for await (const file of files) {
      const isFilenameValid = validateFilename(file);

      if (!isFilenameValid) {
        await this.importUseCases.create.execute({
          file,
          status: 'INVALID_FILENAME',
        });

        continue;
      }

      await this.syncFile(file);
    }

    await this.productUseCases.createMany.execute({
      products: this.products,
    });

    this.logger.log('SYNC FINISHED!');
  }

  private async syncFile(file: string) {
    const res = await fetch(`${this.COODESH_FILES_URL}/${file}`);
    const stream = res.body as unknown as NodeJS.ReadableStream;
    const filename = file.replace('.gz', '');

    await streamPipeline(
      stream,
      createGunzip(),
      createWriteStream(`./tmp/${filename}`),
    ).then(async () => {
      const rl = createInterface({
        input: createReadStream(`./tmp/${filename}`),
        output: process.stdout,
        terminal: false,
      });

      let count = 0;

      rl.on('line', (line) => {
        if (count >= 100) {
          rl.close();
          return;
        }

        const product = JSON.parse(line);
        product.code = product.code.replace(/^"/, '');
        this.products.push(product);

        count++;
      });

      rl.on('close', async () => {
        await this.importUseCases.create.execute({
          file,
          status: 'SUCCESS',
        });

        unlinkSync(`./tmp/${filename}`);
      });

      rl.on('error', async (err) => {
        await this.importUseCases.create.execute({
          file,
          status: 'FAILED',
        });

        this.logger.error(err);
      });
    });
  }
}
