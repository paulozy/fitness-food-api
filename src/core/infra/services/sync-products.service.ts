import { CreateProductUseCase } from '@core/app/usecases/create-product/create-product.usecase';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { exec } from 'child_process';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import * as zlib from 'zlib';

@Injectable()
export class SyncProductsService {
  private readonly logger = new Logger(SyncProductsService.name);

  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    public configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sync() {
    const COODESH_FILES_URL =
      this.configService.get<string>('COODESH_FILES_URL');

    const fetchFiles = await fetch(`${COODESH_FILES_URL}/index.txt`);

    const filesPlainText = await fetchFiles.text();
    const files = filesPlainText.trim().split('\n');

    files.forEach((file) => {
      exec(
        `curl -k -L -s ${COODESH_FILES_URL}/${file} > ./tmp/${file}`,
        async (error) => {
          if (error) {
            this.logger.error(error);
            return;
          }

          const stream = createReadStream(`./tmp/${file}`).pipe(
            zlib.createGunzip(),
          );

          const rl = readline.createInterface({
            input: stream,
            output: process.stdout,
            terminal: false,
          });

          const lines = rl[Symbol.asyncIterator]();
          let count = 0;

          for await (const line of lines) {
            if (count >= 100) {
              stream.close();
              break;
            }

            const product = JSON.parse(line);
            product.code = product.code.replace(/^"/, '');

            await this.createProductUseCase.execute({
              code: product.code,
              url: product.url,
              creator: product.creator,
              created_t: product.created_t,
              last_modified_t: product.last_modified_t,
              product_name: product.product_name,
              quantity: product.quantity,
              brands: product.brands,
              categories: product.categories,
              labels: product.labels,
              cities: product.cities,
              purchase_places: product.purchase_places,
              stores: product.stores,
              ingredients_text: product.ingredients_text,
              traces: product.traces,
              serving_size: product.serving_size,
              serving_quantity: product.serving_quantity,
              nutriscore_score: product.nutriscore_score,
              nutriscore_grade: product.nutriscore_grade,
              main_category: product.main_category,
              image_url: product.image_url,
            });

            count++;
          }

          stream.on('close', () => {
            exec(`rm ./tmp/${file}`);
          });
        },
      );
    });
  }
}
