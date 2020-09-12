import {ReadCommitResult} from 'isomorphic-git/index.umd.min';
import {Commit} from '@entities';
import {logService} from '../debug';

export const gitCommitToDBMapper = (_gitCommit: ReadCommitResult) => {
  logService && console.log('service - gitCommitToDBMapper');

  const gitCommit = new Commit();
  gitCommit.oid = _gitCommit.oid;
  gitCommit.payload = _gitCommit.payload;
  gitCommit.message = _gitCommit.commit.message;
  gitCommit.tree = _gitCommit.commit.tree;
  gitCommit.parent = _gitCommit.commit.parent;
  gitCommit.authorName = _gitCommit.commit.author.name;
  gitCommit.authorEmail = _gitCommit.commit.author.email;
  gitCommit.authorTimestamp = new Date(_gitCommit.commit.author.timestamp);
  gitCommit.committerName = _gitCommit.commit.committer.name;
  gitCommit.committerEmail = _gitCommit.commit.committer.email;
  gitCommit.committerTimestamp = new Date(
    _gitCommit.commit.committer.timestamp,
  );
  gitCommit.gpgsig = _gitCommit.commit.gpgsig;
  return gitCommit;
};
