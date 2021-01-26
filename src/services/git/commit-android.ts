import {ReduxRepo} from '@entities';
import {NativeModules} from 'react-native';

interface commitProps {
  repo: ReduxRepo;
  name: string;
  email: string;
  message: string;
}

export const commitAndroid = async ({
  message,
  repo,
  email,
  name,
}: commitProps) => {
  return await NativeModules.GitModule.commit(repo.path, email, name, message);
};
