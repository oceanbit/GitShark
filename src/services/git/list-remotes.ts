import {logService, NotImplemented} from '../debug';
import {Platform} from 'react-native';
import {listRemotesAndroid} from './list-remotes-android';
import {Remotes} from '@types';

export interface ListRemotesProps {
  path: string;
}
export const listRemotes = async ({
  path,
}: ListRemotesProps): Promise<Remotes[]> => {
  logService && console.log('service - listRemotes');

  if (Platform.OS === 'android') {
    return await listRemotesAndroid({
      path,
    });
  }

  throw new NotImplemented('listRemotes');
};
