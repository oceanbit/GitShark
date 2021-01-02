import {Platform} from 'react-native';
import {DocumentDirectoryPath} from 'react-native-fs';

export const getRepoNameFromPath = (path: string) => {
  /**
   * This regex is overkill but should get `test` in all of these examples:
   *
   * /here/path/test.git
   * /here/path/test
   * /test
   * /test.git
   * test
   * test.git
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, repoName] = /(?:.*\/|^)(.*?)(?:\.git)?$/.exec(path) || [];
  return repoName;
};

export const getRepoNameFromUri = (path: string) => {
  /**
   * This regex is overkill but should get `test` in all of these examples:
   *
   * https://github.com/unicorn-utterances/unicorn-utterances.git
   * https://github.com/unicorn-utterances/unicorn-utterances
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, repoName] = /(?:.*\/|^)(.*?)(?:\.git)?$/.exec(path) || [];
  return repoName;
};

export const validateEmail = (email: string) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const jgitToIsoCommit = (commitId: string) => {
  const commitRegex = /commit\s*(.*?)\s/;
  const [_, oid] = commitRegex.exec(commitId) || [];
  return oid;
};

const iOS = Platform.OS === 'ios';
const iOSPath = DocumentDirectoryPath;

export const getRepoPath = (path: string) => {
  if (!iOS) return path;
  if (path.includes('/') || path.includes('\\')) return path;
  return `${iOSPath}/${path}`;
};
