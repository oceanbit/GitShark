import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../constants/theme';
import {HeaderActionNumber} from './header-action-number/header-action-number';
import {useHistory} from 'react-router-native';

export const RepositoryHeader = () => {
  const history = useHistory();

  return (
    <View style={styles.repoHeader}>
      <TouchableRipple
        style={styles.buttonRipple}
        onPress={() => history.goBack()}>
        <Icon name="arrow-left" size={24} color={theme.colors.accent} />
      </TouchableRipple>
      <View style={styles.repoTitleContainer}>
        <Text style={styles.repoTitle}>Repository</Text>
        <Text style={styles.lastFetched}>Last fetched: 5min ago</Text>
      </View>
      <HeaderActionNumber iconName="arrow-up-circle" val={4} />
      <HeaderActionNumber iconName="arrow-down-circle" val={0} />
      <TouchableRipple style={styles.buttonRipple} onPress={() => {}}>
        <Icon name="dots-horizontal" size={24} color={theme.colors.accent} />
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  repoHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineColor,
  },
  buttonRipple: {
    padding: 8,
    borderRadius: 50,
  },
  repoTitleContainer: {
    flexDirection: 'column',
    marginLeft: 16,
    flexGrow: 1,
  },
  repoTitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  lastFetched: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.colors.fadedGrey,
  },
});
