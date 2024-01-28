import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { changeCWDToHomeDir, getUsername } from './utils/helpers.js';
import { printByeMessage, printCurrentWorkingDir, printFailureMessage, printUsername } from './utils/printFunctions.js';
import { chooseCommand } from './utils/chooseCommand.js';

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

  const [command, ...params] = trimmedMessage.split(' ');
  console.log(params);
  await chooseCommand(command, params.join(' ').trim());
  printCurrentWorkingDir();
});

// rl.on('error', () => printFailureMessage());

rl.on('close', () => printByeMessage(username));
