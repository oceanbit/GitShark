import * as React from 'react';
import {FlatList} from 'react-native';
import {CommitCard} from './commit-card/commit-card';
import {GitLogCommit} from '@services';
import {SharkDivider} from '@components/shark-divider';

interface CommitListProps {
  commits: GitLogCommit[];
  onPress: (commit: GitLogCommit) => void;
}

export const CommitList = ({commits, onPress}: CommitListProps) => {
  return (
    <FlatList
      data={commits}
      keyExtractor={commit => commit.oid}
      renderItem={({item: commit, index: i}) => (
        <React.Fragment key={commit.oid}>
          {i !== 0 && <SharkDivider />}
          <CommitCard commit={commit} onPress={onPress} />
        </React.Fragment>
      )}
    />
  );
};
