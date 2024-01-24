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

const getCurrentWorkingDir = () => {
  return process.cwd();
};

const getHomeDir = () => {
  return os.homedir();
}

const changeCWDToHomeDir = () => {
  process.chdir(getHomeDir());
}

export { getUsername, getCurrentWorkingDir, changeCWDToHomeDir, getHomeDir };