import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { changeCWDToHomeDir, getCurrentWorkingDirectory, getUsername } from './utils/index.js';
import { defaultUsername } from './utils/constants.js';

const username = getUsername() || defaultUsername;
console.log(`Welcome to the File Manager, ${username}!`);
changeCWDToHomeDir();
console.log(`You are currently in ${getCurrentWorkingDirectory()}`);

const rl = readline.createInterface({input, output});

rl.on('line', async (message) => {
  if (message.trim() === '.exit') { 
    return rl.close() 
  };
  console.log(`Received message: ${message}`);
})

rl.on('close', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`))
