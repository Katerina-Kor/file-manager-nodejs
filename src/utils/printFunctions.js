import { getCurrentWorkingDir } from "./helpers.js";
import { DEFAULT_USERNAME } from "./constants.js";

const printUsername = (username = DEFAULT_USERNAME) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

const printCurrentWorkingDir = () => {
  console.log(`You are currently in ${getCurrentWorkingDir()}`);
};

const printByeMessage = (username = DEFAULT_USERNAME) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
};

const printFailureMessage = (errorMessage = 'unknown error') => console.log(`Operation failed: ${errorMessage}`);

const printInvalidMessage = () => console.log('Invalid input');

export { printUsername, printCurrentWorkingDir, printByeMessage, printFailureMessage, printInvalidMessage };