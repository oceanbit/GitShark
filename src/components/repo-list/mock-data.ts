import {Repo, RepoMock} from '../../entities';

export const reposMocks = ([
  {
    id: 1,
    name: 'Repository',
    currentBranchName: 'the_big_branch',
    lastUpdated: new Date(),
    commitsToPull: 4,
    commitsToPush: 2,
    path: '/',
  },
  {
    id: 2,
    name: 'Repository',
    currentBranchName: 'the_medium_branch',
    lastUpdated: new Date(),
    commitsToPull: 0,
    commitsToPush: 0,
    path: '/',
  },
  {
    id: 3,
    name: 'Repository',
    currentBranchName: 'the_small_branch',
    lastUpdated: new Date(),
    commitsToPull: 3,
    commitsToPush: 0,
    path: '/',
  },
] as RepoMock[]) as Repo[];
