import * as React from 'react';
import {RepoListCardLoading} from './repo-list-card';
import {View} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export const RepoListLoading = () => {
  return (
    <MaskedView
      style={{flexGrow: 1, height: 1}}
      maskElement={
        <LinearGradient
          colors={['transparent', '#ffffff', 'transparent']}
          style={{height: '100%', width: '100%'}}
        />
      }>
      <View>
        <RepoListCardLoading />
      </View>
    </MaskedView>
  );
};
