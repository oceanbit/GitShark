import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Repo, getReduxRepo, ReduxRepo} from '@entities';
import {getRepository, getConnection} from 'typeorm';
import {clearChanges} from './gitChangesSlice';
import {clearLog} from './gitLogSlice';
import {clearBranches} from './gitBranchesSlice';
import {findRepoList} from '@store/repoListSlice';

export const findRepo = createAsyncThunk(
  'repository/findRepo',
  async (repoId: string, {getState}) => {
    const {database} = getState() as any;
    if (!database.isLoaded) return;
    const repoRepository = getRepository(Repo);
    const repo = await repoRepository.findOne(repoId, {
      relations: ['branches', 'commits'],
    });
    if (!repo) return null;
    return Promise.resolve(getReduxRepo(repo));
  },
);

export const changeBranch = createAsyncThunk(
  'repository/changeBranch',
  async (
    {repoId, branchName}: {repoId: string | number; branchName: string},
    {getState, dispatch},
  ) => {
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
    dispatch(clearChanges());
    dispatch(clearLog());
    dispatch(clearBranches());
  },
);

const initialState = {
  repo: null as ReduxRepo | null,
};
const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: {
    [findRepo.fulfilled.toString()]: (state, action) => {
      state.repo = action.payload;
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
