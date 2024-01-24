import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { changeCWDToHomeDir, getUsername } from './utils/helpers.js';
import { printByeMessage, printCurrentWorkingDir, printUsername } from './utils/printFunctions.js';
import { cdCommand, lsCommand, upCommand } from './commands/nwd.js';

const username = getUsername();
printUsername(username);

changeCWDToHomeDir();
printCurrentWorkingDir();

const rl = readline.createInterface({input, output});

rl.on('line', async (message) => {
  const trimmedMessage = message.trim();
  if (trimmedMessage === '.exit') { 
    return rl.close() 
  };
  console.log(`Received message: ${trimmedMessage}`);

  const [command, ...params] = trimmedMessage.split(' ');

  if (command === 'up') {
    upCommand();
    printCurrentWorkingDir();
  }
  if (command === 'cd') {
    cdCommand(params.join(' ').trim());
    printCurrentWorkingDir();
  }
  if (command === 'ls') {
    await lsCommand();
    printCurrentWorkingDir();
  }
})

rl.on('close', () => printByeMessage(username));
