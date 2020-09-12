import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Repo, getReduxRepo, ReduxRepo, PushPull} from '@entities';
import {getRepository, getConnection} from 'typeorm';
import {clearChanges} from './gitChangesSlice';
import {clearLog} from './gitLogSlice';
import {
  clearBranches,
  getLocalBranches,
  getRemotesAndBranches,
} from './gitBranchesSlice';
import {findRepoList} from '@store/repoListSlice';
import {getPushPull} from '@services';
import {logStore} from './debug';

export const getCommitRev = createAsyncThunk(
  'repository/getCommitRev',
  async (
    {path, repoId}: {path: string; repoId: string | number},
    {dispatch},
  ) => {
    logStore && console.log('store - getCommitRev');

    const payload = await getPushPull({path});
    dispatch(
      editRepo({
        repoId,
        repoData: {
          commitsToPush: payload.toPush,
          commitsToPull: payload.toPull,
        },
      }),
    );
    return payload;
  },
);

export const findRepo = createAsyncThunk(
  'repository/findRepo',
  async (repoId: string | number, {getState, dispatch}) => {
    logStore && console.log('store - findRepo');

    const {database} = getState() as any;
    if (!database.isLoaded) return;
    const repoRepository = getRepository(Repo);
    const repo = await repoRepository.findOne(repoId, {
      relations: ['commits'],
    });
    if (!repo) return null;
    dispatch(getRemotesAndBranches(repo.path));
    dispatch(getLocalBranches(repo.path));
    dispatch(getCommitRev({path: repo.path, repoId: repoId}));
    return Promise.resolve(getReduxRepo(repo));
  },
);

export const editRepo = createAsyncThunk(
  'repository/editRepo',
  async (
    {repoId, repoData}: {repoId: string | number; repoData: Partial<Repo>},
    {getState, dispatch},
  ) => {
    logStore && console.log('store - editRepo');

    const {database} = getState() as any;
    if (!database.isLoaded) return;
    await getConnection()
      .createQueryBuilder()
      .update(Repo)
      .set(repoData)
      .where('id = :id', {id: repoId})
      .execute();
    // If this is not updated, the repo list will not display the proper branch name
    dispatch(findRepoList());

    // Find repo to prevent "getCommitRev" loop
    const repoRepository = getRepository(Repo);
    const repo = await repoRepository.findOne(repoId, {
      relations: ['commits'],
    });
    return Promise.resolve(getReduxRepo(repo!));
  },
);

export const changeBranch = createAsyncThunk(
  'repository/changeBranch',
  async (
    {repoId, branchName}: {repoId: string | number; branchName: string},
    {getState, dispatch},
  ) => {
    logStore && console.log('store - changeBranch');

    const {database} = getState() as any;
    if (!database.isLoaded) return;
    await getConnection()
      .createQueryBuilder()
      .update(Repo)
      .set({currentBranchName: branchName})
      .where('id = :id', {id: repoId})
      .execute();
    // If this is not updated, the repo list will not display the proper branch name
    dispatch(findRepoList());
    return branchName;
  },
);

export const clearRepo = createAsyncThunk(
  'repository/clearRepo',
  async (_, {dispatch}) => {
    logStore && console.log('store - clearRepo');

    dispatch(clearChanges());
    dispatch(clearLog());
    dispatch(clearBranches());
  },
);

const initialState = {
  repo: null as ReduxRepo | null,
  toPushPull: null as PushPull | null,
};
const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: {
    [findRepo.fulfilled.toString()]: (state, action) => {
      state.repo = action.payload;
      state.toPushPull = {
        toPull: action.payload?.commitsToPull || 0,
        toPush: action.payload?.commitsToPush || 0,
      };
    },
    [editRepo.fulfilled.toString()]: (state, action) => {
      state.repo = action.payload;
      state.toPushPull = {
        toPull: action.payload?.commitsToPull || 0,
        toPush: action.payload?.commitsToPush || 0,
      };
    },
    [getCommitRev.fulfilled.toString()]: (state, action) => {
      state.toPushPull = action.payload;
    },
    [clearRepo.fulfilled.toString()]: (_, __) => {
      return initialState;
    },
    [changeBranch.fulfilled.toString()]: (state, action) => {
      state.repo!.currentBranchName = action.payload;
    },
  },
});

export const repositoryReducer = repositorySlice.reducer;
