import { createReadStream, createWriteStream} from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';

const compressCommand = async (srcFilePath, destFilePath) => {
  try {
    const readStream = createReadStream(srcFilePath, {
      encoding: 'utf8',
      flags: 'r',
    });
    const writeStream = createWriteStream(destFilePath, { flags: 'wx'});
    const brotliCompress = createBrotliCompress();

    await pipeline(readStream, brotliCompress, writeStream);

  } catch (error) {
    printFailureMessage(error.message);
  }
};

const decompressCommand = async (srcFilePath, destFilePath) => {
  try {
    const readStream = createReadStream(srcFilePath, {
      flags: 'r',
    });
    const writeStream = createWriteStream(destFilePath, { flags: 'wx'});
    const brotliDecompress = createBrotliDecompress();

    await pipeline(readStream, brotliDecompress, writeStream);

  } catch (error) {
    printFailureMessage(error.message);
  }
}

export { compressCommand, decompressCommand };