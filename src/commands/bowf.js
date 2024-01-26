import { createReadStream, createWriteStream } from 'fs';
import fs from 'fs/promises';
import { pipeline } from 'stream/promises';

const catCommand = (file) => {
  createReadStream(file).pipe(process.stdout)
};

const addCommand = async (fileName) => {
  await fs.appendFile(
    fileName,
    '',
    { flag: 'ax' }
  );
};

const rnCommand = async (fileName, newFileName) => {
  await fs.rename(fileName, newFileName);
};

const cpCommand = async (srcFileName, descFileName) => {
  const readStream = createReadStream(srcFileName, { flags: 'r'});
  const writeStream = createWriteStream(descFileName, { flags: 'w'});
  await pipeline(readStream, writeStream);
};

const rmCommand = async (fileName) => {
  await fs.unlink(fileName);
}

const mvCommand = async (srcFileName, destFileName) => {
  await cpCommand(srcFileName, destFileName);
  await rmCommand(srcFileName);
};


export { catCommand, addCommand, rnCommand, cpCommand, rmCommand, mvCommand };