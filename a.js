/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const { createReadStream } = require('fs');
const { resolve } = require('path');

class SyncProductsService {
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
    createReadStream(
      resolve(__dirname, `./tmp/${files[0].replace('.gz', '')}`),
    ).on('data', (chunk) => {
      const data = JSON.parse(
        chunk
          .toString()
          .replaceAll(`""0`, `"`)
          .replaceAll(
            `"";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`,
            '""',
          )
          .replaceAll(`"}`, `}`),
      );

      data.forEach((product) => {
        products.push(product);
      });
    });

    console.log(products);
  }
}

const syncProductsService = new SyncProductsService();

syncProductsService.execute();
