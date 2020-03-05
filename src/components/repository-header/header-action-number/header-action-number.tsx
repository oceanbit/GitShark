import React from 'react';
import {TouchableRipple} from 'react-native-paper';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../../../constants/theme';

export const HeaderActionNumber = ({
  iconName,
  val,
}: {
  iconName: string;
  val?: number;
}) => {
  return (
    <TouchableRipple
      onPress={() => {}}
      style={!!val ? styles.outlineContainer : styles.container}>
      <View style={styles.repoHeader}>
        <Icon name={iconName} size={24} color={theme.colors.accent} />
        {!!val && <Text style={styles.valText}>{val}</Text>}
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  repoHeader: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    marginRight: 8,
  },
  outlineContainer: {
    borderWidth: 2,
    borderColor: theme.colors.outlineColor,
    borderRadius: theme.roundness,
    marginRight: 8,
  },
  backBtn: {
    padding: 8,
    borderRadius: 50,
  },
  valText: {
    fontSize: 16,
    marginLeft: 8,
    color: theme.colors.accent,
  },
});
