import * as React from 'react';
import {View} from 'react-native';

export const SrOnly: React.FC = ({children}) => {
  return (
    <View
      style={{
        overflow: 'hidden',
        height: 1,
        width: 1,
      }}>
      {children}
    </View>
  );
};
