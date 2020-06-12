import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@store';
import {CommitDetailsUI} from './commit-details.ui';
import {getCommitHeaderBody} from '@services';

export const CommitDetails = () => {
  const {selectedCommit} = useSelector((state: RootState) => state.commits);

  if (!selectedCommit) return null;

  const {title, message} = getCommitHeaderBody({commit: selectedCommit});

  return (
    <CommitDetailsUI
      title={title}
      message={message}
      committer={selectedCommit.committer}
      author={selectedCommit.author}
      par={selectedCommit.parent[0]}
      sha={selectedCommit.oid}
      onNavToPar={() => {}}
    />
  );
};
