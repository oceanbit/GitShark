import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Repo, getReduxRepo, ReduxRepo} from '@entities';
import {getRepository} from 'typeorm';
import {logStore} from './debug';
import {
  getSerializedErrorStr,
  PayloadSerializedError,
  StoreError,
} from '@types';
import {getGitStatus} from '@store/gitChangesSlice';

export const findRepoList = createAsyncThunk(
  'repository/findRepoList',
  async (_, {getState}) => {
    logStore && console.log('store - findRepoList');

    const {database} = getState() as any;
    if (!database.isLoaded) return;
    const repoRepository = getRepository(Repo);
    const foundRepos = await repoRepository.find({});
    if (!foundRepos) return null;
    return foundRepos.map(repo => getReduxRepo(repo));
  },
);

const initialState = {
  repoList: null as ReduxRepo[] | null,
  error: null as null | StoreError,
};
const repoListSlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: {
    [findRepoList.fulfilled.toString()]: (state, action) => {
      state.repoList = action.payload;
    },
    [findRepoList.rejected.toString()]: (
      state,
      action: PayloadSerializedError,
    ) => {
      state.error = getSerializedErrorStr(action.error);
    },
  },
});

export const repoListReducer = repoListSlice.reducer;
