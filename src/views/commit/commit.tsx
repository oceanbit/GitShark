import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RepoContext} from '../../constants/repo-context';
import {theme} from '../../constants/theme';
import {DatabaseLoadedContext} from '../../constants/database-loaded-context';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {SharkIconButton} from '../../components/shark-icon-button/shark-icon-button';

export const Commit = () => {
  const isDBLoaded = React.useContext(DatabaseLoadedContext);
  const {repo} = React.useContext(RepoContext);
  const history = useNavigation();

  return (
    <View>
      <SharkIconButton
        onPress={() => history.goBack()}
        iconName="dots-horizontal"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  headingText: {
    marginBottom: 16,
    fontSize: 48,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 16,
  },
  halfSection: {
    height: '50%',
  },
  firstSection: {
    borderBottomColor: theme.colors.outlineColor,
    borderBottomWidth: 1,
  },
  fab: {
    margin: 0,
    padding: 0,
    left: 0,
  },
});
