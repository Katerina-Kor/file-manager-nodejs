import { createReadStream } from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { pipeline } from 'stream/promises';
import { printFailureMessage } from '../utils/printFunctions.js';
import { getCurrentWorkingDir } from '../utils/helpers.js';

export const hashCommand = async (filePath) => {
  try {
    const resolvedPath = path.resolve(getCurrentWorkingDir(), filePath);
    const readStream = createReadStream(resolvedPath);
    const hash = createHash('sha256').setEncoding('hex');

    hash.on('finish', () => console.log(hash.read()));

    await pipeline(readStream, hash);
  } catch (error) {
    printFailureMessage(error.message);
  }
}