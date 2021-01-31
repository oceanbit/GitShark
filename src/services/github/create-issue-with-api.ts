import {RepoConfig} from '@constants/repo-config';
import {baseRequest} from '@services/github/base-request';
import RNSecureKeyStore from 'react-native-secure-key-store';
import {GITHUB_TOKEN_STORAGE_KEY} from '@constants';

interface IssueAPIReturn {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body: string;
  locked: true;
  active_lock_reason: string;
  comments: number;
}

export const createIssueWithAPI = async (contents: string) => {
  const token = await RNSecureKeyStore.get(GITHUB_TOKEN_STORAGE_KEY);

  const issueContents = await baseRequest<IssueAPIReturn>({
    path: `/repos/${RepoConfig.owner}/${RepoConfig.name}/issues`,
    method: 'POST',
    gh_token: token,
    body: JSON.stringify({
      title: '[BUG] {PLEASE EDIT} Report filed from app',
      body: contents,
    }),
  }).then(res => res.json());

  return `https://github.com/${RepoConfig.owner}/${RepoConfig.name}/issues/${issueContents.number}`;
};
