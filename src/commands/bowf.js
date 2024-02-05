import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';
import { printFailureMessage } from '../utils/printFunctions.js';
import { getCurrentWorkingDir } from '../utils/helpers.js';

const catCommand = async (filePath) => {
  return new Promise((res) => {
    const readStream = createReadStream(path.resolve(getCurrentWorkingDir(), filePath), 'utf8');
    readStream.on('data', (data) => {
      console.log(data);
    });
    readStream.on('end', () => res());
    readStream.on('error', (error) => {
      printFailureMessage(error.message);
      res();
    })
  })
};

const addCommand = async (fileName) => {
  try {
    await fs.appendFile(
      path.join(getCurrentWorkingDir(), fileName),
      '',
      { flag: 'ax' }
    );
  } catch (error) {
    printFailureMessage(error.message);
  }
};

const rnCommand = async (fileName, newFileName) => {
  const srcFilePath = path.resolve(getCurrentWorkingDir(), fileName);
  const destFilePath = path.resolve(getCurrentWorkingDir(), newFileName)
  try {
    // check if dest file already exists
    await fs.appendFile(
      destFilePath,
      '',
      { flag: 'ax' }
    );

    await fs.rename(srcFilePath, destFilePath);
  } catch (error) {
    printFailureMessage(error.message);
  }
};

const cpCommand = async (fileName, copyFileDir) => {
  try {
    const srcFilePath = path.resolve(getCurrentWorkingDir(), fileName);
    const destFilePath = path.resolve(getCurrentWorkingDir(), copyFileDir, path.basename(fileName));
    await fs.access(srcFilePath);
    const readStream = createReadStream(srcFilePath, { flags: 'r'});
    const writeStream = createWriteStream(destFilePath, { flags: 'wx'});
    await pipeline(readStream, writeStream);
  } catch (error) {
    printFailureMessage(error.message);
  }
};

const rmCommand = async (fileName) => {
  try {
    await fs.unlink(path.resolve(getCurrentWorkingDir(), fileName));
  } catch (error) {
    printFailureMessage(error.message);
  }
}

const mvCommand = async (fileName, copyFileDir) => {
  try {
    const srcFilePath = path.resolve(getCurrentWorkingDir(), fileName);
    const destFilePath = path.resolve(getCurrentWorkingDir(), copyFileDir, path.basename(fileName));
    await fs.access(srcFilePath);
    const readStream = createReadStream(srcFilePath, { flags: 'r'});
    const writeStream = createWriteStream(destFilePath, { flags: 'wx'});
    await pipeline(readStream, writeStream);
    await fs.unlink(srcFilePath);
  } catch (error) {
    printFailureMessage(error.message);
  }
};


export { catCommand, addCommand, rnCommand, cpCommand, rmCommand, mvCommand };