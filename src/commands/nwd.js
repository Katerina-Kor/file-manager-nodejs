import fs from 'fs/promises';
import path from 'path';
import { getCurrentWorkingDir } from '../utils/helpers.js';
import { printFailureMessage } from '../utils/printFunctions.js';

const upCommand = () => {
  try {
    process.chdir('..');
  } catch (error) {
    printFailureMessage(error.message);
  }
};

const cdCommand = (pathToDir) => {
  try {
    process.chdir(path.resolve(getCurrentWorkingDir(), pathToDir));
  } catch (error) {
    printFailureMessage(error.message);
  }
};

const lsCommand = async () => {
  try {
    const list = await fs.readdir(getCurrentWorkingDir(), {
      withFileTypes: true
    });
    // ignore symbolic links
    const filteredAndSortedList = list
      .filter(item => item.isDirectory() || item.isFile())
      .map(item => ({Name: item.name, Type: item.isDirectory() ? 'directory' : 'file'}))
      .sort((a, b) => {
        if (a.Type === 'directory' && b.Type === 'file') return -1;
        if (b.Type === 'directory' && a.Type === 'file') return 1;
        a.Name.localeCompare(b.Name);
      })
    
    console.table(filteredAndSortedList);
  } catch (error) {
    printFailureMessage(error.message);
  }
}

export { upCommand, cdCommand, lsCommand };
