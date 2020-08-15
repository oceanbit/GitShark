import {NativeModules} from 'react-native';
import {ChangesArrayItem} from '@services';

export const getRepoStatusAndroid = async (path: string) => {
  return (await NativeModules.GitModule.status(path)) as ChangesArrayItem[];
};
