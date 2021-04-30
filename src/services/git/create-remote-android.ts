import {NativeModules} from 'react-native';
import {CreateRemoteProps} from './create-remote';

export const createRemoteAndroid = async ({
  repo,
  remoteName,
  remoteURL,
}: CreateRemoteProps) => {
  return await NativeModules.GitModule.addRemote(
    repo.path,
    remoteName,
    remoteURL,
  );
};
