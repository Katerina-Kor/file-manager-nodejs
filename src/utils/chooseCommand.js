import { addCommand, catCommand, cpCommand, mvCommand, rmCommand, rnCommand } from "../commands/bowf.js";
import { cdCommand, lsCommand, upCommand } from "../commands/nwd.js";
import { osCommand } from "../commands/os.js";
import { normalizePath, resolvePathes } from "./helpers.js";

export const chooseCommand = async (command, arg) => {
  switch (command) {
    case 'up': {
      upCommand();      
      break;
    }
    case 'cd': {
      const normalizedArg = normalizePath(arg);
      if (!normalizedArg) {
        printInvalidMessage();
        return;
      }
      cdCommand(normalizedArg);
      break;
    }
    case 'ls': {
      await lsCommand();
      break;
    }
    case 'cat':  {
      const normalizedArg = normalizePath(arg);
      if (!normalizedArg) {
        printInvalidMessage();
        return;
      }
      await catCommand(normalizedArg);
      break;
    }
    case 'add': {
      const normalizedArg = normalizePath(arg);
      if (!normalizedArg) {
        printInvalidMessage();
        return;
      }
      await addCommand(normalizedArg);
      break;
    }
    case 'rn': {
      const [srcPath, destPath] = resolvePathes(arg);
      if (!srcPath || !destPath) {
        printInvalidMessage();
        return;
      }
      await rnCommand(srcPath, destPath);
      break;
    }
    case 'cp': {
      const [srcPath, destPath] = resolvePathes(arg);
      if (!srcPath || !destPath) {
        printInvalidMessage();
        return;
      }
      await cpCommand(srcPath, destPath);
      break;
    }
    case 'rm': {
      const normalizedArg = normalizePath(arg);
      if (!normalizedArg) {
        printInvalidMessage();
        return;
      }
      await rmCommand(normalizedArg);
      break;
    }
    case 'mv': {
      const [srcPath, destPath] = resolvePathes(arg);
      if (!srcPath || !destPath) {
        printInvalidMessage();
        return;
      }
      await mvCommand(srcPath, destPath);
      break;
    }
    case 'os': {
      osCommand(arg);
      break;
    }

    default:
      break;
  }
}