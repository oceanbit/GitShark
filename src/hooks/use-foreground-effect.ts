import * as React from 'react';
import {AppState, AppStateStatus} from 'react-native';

export const useForegroundEffect = (fn: () => void) => {
  React.useEffect(() => {
    const listener = (e: AppStateStatus) => {
      if (e === 'active') {
        fn();
      }
    };
    AppState.addEventListener('change', listener);

    return () => AppState.removeEventListener('change', listener);
  }, [fn]);
};
