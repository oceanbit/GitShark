import * as React from 'react';
import DefaultPreference from 'react-native-default-preference';
import {ManualUser} from '../types';
import {MANUAL_USER_STORAGE_KEY} from '../constants';

export const useManualUserData = () => {
  const [manualUser, setManualUserLocal] = React.useState<ManualUser | null>(
    null,
  );

  /**
   * If data is already cached, set the user on initial load
   */
  React.useEffect(() => {
    DefaultPreference.get(MANUAL_USER_STORAGE_KEY)
      .then(data => {
        if (data) {
          setManualUserLocal(JSON.parse(data) as ManualUser);
        }
      })
      .catch(e => console.error(e));
  }, []);

  const setManualUser = React.useCallback((user: ManualUser) => {
    DefaultPreference.set(MANUAL_USER_STORAGE_KEY, JSON.stringify(user))
      .then(() => setManualUserLocal(user))
      .catch(e => console.error(e));
  }, []);

  return {manualUser, setManualUser};
};
