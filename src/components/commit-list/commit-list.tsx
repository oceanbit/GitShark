import * as React from 'react';
import {FlatList} from 'react-native';
import {CommitCard} from './commit-card/commit-card';
import {GitLogCommit} from '@services';
import {SharkDivider} from '@components/shark-divider';
import {ReduxRepo} from '@entities';

interface CommitListProps {
  commits: GitLogCommit[];
  onPress: (commit: GitLogCommit) => void;
  repo: ReduxRepo;
}

interface RenderItemProps {
  index: number;
  item: GitLogCommit;
}

type CommitItemProps = Omit<CommitListProps, 'commits'> & RenderItemProps;

const CommitItem = React.memo(
  ({item: commit, index: i, onPress, repo}: CommitItemProps) => {
    return (
      <React.Fragment key={commit.oid}>
        {i !== 0 && <SharkDivider />}
        <CommitCard
          commit={commit}
          onPress={onPress}
          commitsToPull={repo.commitsToPull}
          commitsToPush={repo.commitsToPush}
        />
      </React.Fragment>
    );
  },
);

export const CommitList = ({commits, onPress, repo}: CommitListProps) => {
  const renderItemFn = React.useMemo(() => {
    return (props: RenderItemProps) => (
      <CommitItem {...props} onPress={onPress} repo={repo} />
    );
  }, [onPress, repo]);

  return (
    <FlatList
      data={commits}
      keyExtractor={commit => commit.oid}
      renderItem={renderItemFn}
    />
  );
};
