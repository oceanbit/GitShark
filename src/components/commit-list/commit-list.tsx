import * as React from 'react';
import {View, FlatList} from 'react-native';
import {CommitCard} from './commit-card/commit-card';
import {theme} from '../../constants';
import {GitLogCommit} from '../../services';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

interface CommitListProps {
  commits: GitLogCommit[];
}

export const CommitList = ({commits}: CommitListProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <FlatList
      data={commits}
      keyExtractor={commit => commit.oid}
      renderItem={({item: commit, index: i}) => (
        <View style={i === 0 ? {} : styles.commitCardItem} key={commit.oid}>
          <CommitCard commit={commit} />
        </View>
      )}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  commitCardItem: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.divider,
  },
});
