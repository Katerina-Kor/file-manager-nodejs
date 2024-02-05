import os from 'os';
import { DEFAULT_USERNAME } from './constants.js';

const getUsername = () => {
  const args = process.argv;
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  
  if (usernameArg) {
    const userName = usernameArg.split('=')[1];

    return userName.length === 0 ? DEFAULT_USERNAME : userName;
  };

  return DEFAULT_USERNAME;
};

const getCurrentWorkingDir = () => {
  return process.cwd();
};

const getHomeDir = () => {
  return os.homedir();
};

const changeCWDToHomeDir = () => {
  process.chdir(getHomeDir());
};

const normalizePath = (path) => {
  let resPath = path;
  if (resPath[0] === '"') {
    resPath = resPath.slice(1);
  };
  const lastSymbolIndex = resPath.length - 1;
  if (resPath[lastSymbolIndex] === '"') {
    resPath = resPath.slice(0, lastSymbolIndex);
  };
  return resPath;
};

const resolvePathes = (arg) => {
  const res = [];
  if (arg[0] === '"') {
    const endNameIndex = arg.indexOf('"', 1);
    res[0] = normalizePath(arg.slice(0, endNameIndex));
    res[1] = normalizePath(arg.slice(endNameIndex + 1).trim());
  } else {
    const [firstArg, ...rest] = arg.split(' ');
    res[0] = firstArg;
    res[1] = normalizePath(rest.join(' '));
  }
  return res;
}

export { getUsername, getCurrentWorkingDir, changeCWDToHomeDir, getHomeDir, normalizePath, resolvePathes };