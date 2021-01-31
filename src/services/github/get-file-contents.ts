import {baseRequest} from '@services/github/base-request';
import {RepoConfig} from '@constants/repo-config';
import {Buffer} from 'buffer';

interface ContentsAPIReturn {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file';
  content: string;
  encoding: 'base64';
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

export const getFileContents = async (path: string) => {
  const fileContents = await baseRequest<ContentsAPIReturn>({
    path: `/repos/${RepoConfig.owner}/${RepoConfig.name}/contents/${path}`,
    method: 'GET',
    gh_token: '',
  }).then(res => res.json());

  return Buffer.from(fileContents.content, 'base64').toString('utf-8');
};
