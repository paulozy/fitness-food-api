import { CreateProductUseCase } from '@core/app/usecases/create-product/create-product.usecase';
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { Readable } from 'stream';

@Injectable()
export class SyncProductsService {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  async execute() {
    const fetchFiles = await fetch(
      'https://challenges.coode.sh/food/data/json/index.txt',
    );

    const filesPlainText = await fetchFiles.text();
    const files = filesPlainText.trim().split('\n');
    const products = [];

    // create autocalled function to download and unzip the files
    await (async () => {
      exec(
        `curl -k -L -s https://challenges.coode.sh/food/data/json/${files[0]} > ./tmp/${files[0]} && gunzip ./tmp/${files[0]}`,
      );
    })();

    // i will need use streams to read the file

    const MyStream = new Readable();

    MyStream.on('data', (chunk) => {
      console.log(
        JSON.parse(
          chunk
            .replaceAll(`""0`, `"`)
            .replaceAll(
              `"";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`,
              '""',
            )
            .replaceAll(`"}`, `}`),
        ),
      );
    });
  }
}
