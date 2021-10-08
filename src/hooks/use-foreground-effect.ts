import * as React from 'react';
import {AppState, AppStateStatus} from 'react-native';

export const useForegroundEffect = (fn: () => void) => {
  React.useEffect(() => {
    const listener = (e: AppStateStatus) => {
      if (e === 'active') {
        fn();
      }
    };
    const changeListener = AppState.addEventListener('change', listener);

    return () => changeListener.remove();
  }, [fn]);
};
