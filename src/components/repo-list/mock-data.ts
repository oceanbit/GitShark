export const reposMocks = [
  {
    id: 'test1',
    name: 'Repository',
    branchName: 'the_big_branch',
    lastUpdated: '2h',
    commitsToPull: 4,
    commitsToPush: 2,
  },
  {
    id: 'test2',
    name: 'Repository',
    branchName: 'the_medium_branch',
    lastUpdated: '6h',
    commitsToPull: 0,
    commitsToPush: 0,
  },
  {
    id: 'test3',
    name: 'Repository',
    branchName: 'the_small_branch',
    lastUpdated: '1d',
    commitsToPull: 3,
    commitsToPush: 0,
  },
];

export type RepoMock = (typeof reposMocks)[0];
