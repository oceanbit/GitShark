import * as React from 'react';
import {RepoListCardLoading} from './repo-list-card';
import {StyleSheet, View} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';

export const RepoListLoading = () => {
  // Wut https://github.com/react-native-community/react-native-masked-view/issues/17#issuecomment-524426994
  const [gradientColor, setGradientColor] = React.useState('#ffffff');

  React.useEffect(() => {
    setTimeout(() => {
      setGradientColor('#ffffff90');
    }, 1);
  }, []);

  return (
    <MaskedView
      style={{flexGrow: 1, height: 1}}
      maskElement={
        <LinearGradient
          colors={['transparent', gradientColor, 'transparent']}
          style={{height: '100%', width: '100%'}}
        />
      }>
      <View style={styles.cardsContainer}>
        <RepoListCardLoading />
      </View>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
      // backgroundColor: 'red'
  },
  cardLoading: {
    marginBottom: 16,
  },
});
