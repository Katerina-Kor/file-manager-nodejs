import os from 'os';

const getUsername = () => {
  const args = process.argv;
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  
  if (usernameArg) {
    const userName = usernameArg.split('=')[1];

    return userName.length === 0 ? undefined : userName;
  };

  return;
};

const getCurrentWorkingDirectory = () => {
  return process.cwd();
};

const changeCWDToHomeDir = () => {
  const homeDir = os.homedir();
  process.chdir(homeDir);
}

export { getUsername, getCurrentWorkingDirectory, changeCWDToHomeDir };