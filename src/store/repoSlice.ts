import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Repo, getReduxRepo, ReduxRepo} from '../entities';
import {getRepository} from 'typeorm';
import {clearChanges} from './gitChangesSlice';
import {clearLog} from './gitLogSlice';
import {clearBranches} from './gitBranchesSlice';

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
  },
});

export const repositoryReducer = repositorySlice.reducer;
