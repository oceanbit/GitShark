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
      style={{height: '100%'}}
      maskElement={
        <LinearGradient
          colors={['transparent', gradientColor, 'transparent']}
          style={{height: '100%', width: '100%'}}
        />
      }>
      <View style={styles.cardsContainer}>
        <View style={styles.cardLoading}>
          <RepoListCardLoading />
        </View>

        <View style={styles.cardLoading}>
          <RepoListCardLoading />
        </View>

        <View style={styles.cardLoading}>
          <RepoListCardLoading />
        </View>

        <View style={styles.cardLoading}>
          <RepoListCardLoading />
        </View>

        <View style={styles.cardLoading}>
          <RepoListCardLoading />
        </View>

        <View style={styles.cardLoading}>
          <RepoListCardLoading />
        </View>

        <View style={styles.cardLoading}>
          <RepoListCardLoading />
        </View>

        <View style={styles.cardLoading}>
          <RepoListCardLoading />
        </View>
      </View>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    padding: 16,
  },
  cardLoading: {
    marginBottom: 16,
  },
});
