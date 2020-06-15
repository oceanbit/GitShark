import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@store';
import {CommitDetailsUI} from './commit-details.ui';
import {getCommitHeaderBody, getFileStateChanges} from '@services';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {GitLogCommit} from '@services';

export const CommitDetails = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const {
    params: {commitId},
  } = (useRoute() as any) as {params: {commitId: string}};
  const [commit, setCommit] = React.useState<GitLogCommit | null>(null);

  const [files, setFiles] = React.useState<any[]>([]);

  const navigation = useNavigation<any>();

  React.useEffect(() => {
    if (!repo || !commitId) return;
    git
      .readCommit({dir: repo.path, fs: fs, oid: commitId})
      .then(ccommit => {
        setCommit({
          ...ccommit.commit,
          oid: ccommit.oid,
        });
      })
      .catch(err => console.log(err));
  }, [commitId, repo]);

  React.useEffect(() => {
    if (!repo || !commit) return;
    getFileStateChanges(commit.oid, commit.parent[0], repo.path).then(files => {
      const newFiles = files.filter(file => file.fileStatus !== 'unmodified');
      setFiles(newFiles);
    });
  }, [repo, commit]);

  if (!commit) return null;

  const {title, message} = getCommitHeaderBody({commit});

  return (
    <CommitDetailsUI
      title={title}
      message={message}
      committer={commit.committer}
      author={commit.author}
      parents={commit.parent}
      sha={commit.oid}
      files={files}
      onNavToPar={parentOid => {
        navigation.push('CommitDetails', {
          commitId: parentOid,
        });
      }}
    />
  );
};
