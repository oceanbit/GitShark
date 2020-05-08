import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Repo, getReduxRepo, ReduxRepo} from '../entities';
import {getRepository} from 'typeorm';

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

const repositorySlice = createSlice({
  name: 'repository',
  initialState: {
    repo: null as ReduxRepo | null,
  },
  reducers: {},
  extraReducers: {
    [findRepo.fulfilled.toString()]: (state, action) => {
      state.repo = action.payload;
    },
  },
});

export const repositoryReducer = repositorySlice.reducer;
