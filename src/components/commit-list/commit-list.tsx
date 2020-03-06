import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {commitsMocks} from './mock-data';
import {CommitCard} from './commit-card/commit-card';
import {theme} from '../../constants/theme';

export const CommitList = () => {
  return (
    <View>
      {commitsMocks.map(commit => {
        return (
          <View style={styles.commitCardItem} key={commit.id}>
            <CommitCard commit={commit} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  commitCardItem: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.outlineColor,
  },
});
