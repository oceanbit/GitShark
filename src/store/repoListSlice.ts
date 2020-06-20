import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Repo, getReduxRepo, ReduxRepo} from '@entities';
import {getRepository} from 'typeorm';

export const findRepoList = createAsyncThunk(
  'repository/findRepoList',
  async (_, {getState}) => {
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
};
const repoListSlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers: {
    [findRepoList.fulfilled.toString()]: (state, action) => {
      state.repoList = action.payload;
    },
  },
});

export const repoListReducer = repoListSlice.reducer;
