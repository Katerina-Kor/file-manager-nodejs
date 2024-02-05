import { getCurrentWorkingDir } from "./helpers.js";

const printUsername = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

const printCurrentWorkingDir = () => {
  console.log(`You are currently in ${getCurrentWorkingDir()}`);
};

const printByeMessage = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
};

const printFailureMessage = (errorMessage = 'unknown error') => console.log(`Operation failed: ${errorMessage}`);

const printInvalidMessage = () => console.log('Invalid input');

export { printUsername, printCurrentWorkingDir, printByeMessage, printFailureMessage, printInvalidMessage };