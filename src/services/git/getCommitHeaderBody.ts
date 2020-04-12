import {GitLogCommit} from './gitLog';

/**
 * Either grab until the first newline if shorter than 55 chars
 * Or grab the first 56 and call _that_ the title
 */
const headerBodyRegex = /(.{0,55}(?:\n|\r\n)|.{0,56})([\s\S]*)/;

interface GetCommitHeaderBody {
  commit: GitLogCommit;
}

export const getCommitHeaderBody = ({commit}: GetCommitHeaderBody) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, title = '', message = ''] =
    headerBodyRegex.exec(commit.message) || [];
  return {title, message};
};
