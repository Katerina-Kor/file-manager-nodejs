import { addCommand, catCommand, cpCommand, mvCommand, rmCommand, rnCommand } from "../commands/bowf.js";
import { hashCommand } from "../commands/hash.js";
import { cdCommand, lsCommand, upCommand } from "../commands/nwd.js";
import { osCommand } from "../commands/os.js";
import { compressCommand, decompressCommand } from "../commands/zip.js";
import { normalizePath, resolvePathes } from "./helpers.js";
import { printInvalidMessage } from "./printFunctions.js";

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
    case 'hash': {
      const normalizedArg = normalizePath(arg);
      if (!normalizedArg) {
        printInvalidMessage();
        return;
      }
      await hashCommand(normalizedArg);
      break;
    }
    case 'compress': {
      const [srcPath, destPath] = resolvePathes(arg);
      if (!srcPath || !destPath) {
        printInvalidMessage();
        return;
      }
      await compressCommand(srcPath, destPath);
      break;
    }
    case 'decompress': {
      const [srcPath, destPath] = resolvePathes(arg);
      if (!srcPath || !destPath) {
        printInvalidMessage();
        return;
      }
      await decompressCommand(srcPath, destPath);
      break;
    }
    default:
      printInvalidMessage();
  }
}