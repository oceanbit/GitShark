import * as React from 'react';
import {View, FlatList} from 'react-native';
import {CommitCard} from './commit-card/commit-card';
import {borders, theme} from '@constants';
import {GitLogCommit} from '@services';
import {DynamicStyleSheet, useDynamicStyleSheet} from 'react-native-dark-mode';

interface CommitListProps {
  commits: GitLogCommit[];
  onPress: (commit: GitLogCommit) => void;
}

export const CommitList = ({commits, onPress}: CommitListProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);

  return (
    <FlatList
      data={commits}
      keyExtractor={commit => commit.oid}
      renderItem={({item: commit, index: i}) => (
        <View style={i === 0 ? {} : styles.commitCardItem} key={commit.oid}>
          <CommitCard commit={commit} onPress={onPress} />
        </View>
      )}
    />
  );
};

const dynamicStyles = new DynamicStyleSheet({
  commitCardItem: {
    borderTopWidth: borders.normal,
    borderTopColor: theme.colors.tint_on_surface_16,
  },
});
