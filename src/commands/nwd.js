import fs from 'fs/promises';
import { getCurrentWorkingDir } from '../utils/helpers.js';

const upCommand = () => {
  process.chdir('..');
};

const cdCommand = (path) => {
  process.chdir(path);
};

const lsCommand = async () => {
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
}

export { upCommand, cdCommand, lsCommand };