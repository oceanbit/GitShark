import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {CommitCard} from './commit-card/commit-card';
import {theme} from '../../constants/theme';
import {GitLogCommit} from 'src/services/git/gitLog';

interface CommitListProps {
  commits: GitLogCommit[];
}

export const CommitList = ({commits}: CommitListProps) => {
  return (
    <View>
      {commits.map(commit => {
        return (
          <View style={styles.commitCardItem} key={commit.oid}>
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
