/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const { createReadStream } = require('fs');
const { resolve } = require('path');
const zlib = require('zlib');
const readline = require('readline');

class SyncProductsService {
  async execute() {
    const fetchFiles = await fetch(
      'https://challenges.coode.sh/food/data/json/index.txt',
    );

    const filesPlainText = await fetchFiles.text();
    const files = filesPlainText.trim().split('\n');

    files.forEach((file) => {
      exec(
        `curl -k -L -s https://challenges.coode.sh/food/data/json/${file} > ./tmp/${file}`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }

          const stream = createReadStream(
            resolve(__dirname, `./tmp/${file}`),
          ).pipe(zlib.createGunzip());

          const rl = readline.createInterface({
            input: stream,
            output: process.stdout,
            terminal: false,
          });

          rl.on('line', (line) => {
            for (let i = 0; i < 100; i++) {
              const product = JSON.parse(line);
              console.log(product);
            }

            stream.close();
          });

          stream.on('close', () => {
            exec(`rm ./tmp/${file}`);
          });
        },
      );
    });

    // i will need use streams to read the file
  }
}

const syncProductsService = new SyncProductsService();

syncProductsService.execute();
