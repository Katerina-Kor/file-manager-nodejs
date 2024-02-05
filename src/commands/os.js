import os from 'os';
import { printFailureMessage, printInvalidMessage } from '../utils/printFunctions.js';

export const osCommand = (param) => {
  switch (param) {
    case '--EOL':
      try {
        console.log(JSON.stringify(os.EOL));
      } catch (error) {
        printFailureMessage(error.message);
      }
      break;
    
    case '--cpus':
      try {
        const cpus = os.cpus();
        console.log(`Amount of CPUs: ${cpus.length}`);
        cpus.forEach((cpu, index) => {
          console.log(`CPU${index + 1}: model - ${cpu.model}, clock rate - ${(cpu.speed / 1000).toFixed(2)} GHz`);
        });
      } catch (error) {
        printFailureMessage(error.message);
      }
      break;
  
    case '--homedir':
      try {
        console.log(os.homedir());
      } catch (error) {
        printFailureMessage(error.message);
      }
      break;

    case '--username':
      try {
        console.log(os.userInfo().username);
      } catch (error) {
        printFailureMessage(error.message);
      }
      break;

    case '--architecture':
      try {
        console.log(process.arch);
      } catch (error) {
        printFailureMessage(error.message);
      }
      break;

    default:
      printInvalidMessage();
  }
}