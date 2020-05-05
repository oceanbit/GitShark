import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {gitLog, GitLogCommit} from '../services';
import {Repo} from '../entities';

export const getGitLog = createAsyncThunk(
  'commits/getGitLog',
  async (repo: Repo) => {
    return gitLog({repo});
  },
);

const commitsSlice = createSlice({
  name: 'commits',
  initialState: {
    commits: [] as GitLogCommit[],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [getGitLog.fulfilled.toString()]: (
      state,
      action: PayloadAction<GitLogCommit[]>,
    ) => {
      state.commits = action.payload;
    },
  },
});

export const commitsReducer = commitsSlice.reducer;
