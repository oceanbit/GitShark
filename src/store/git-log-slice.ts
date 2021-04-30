import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {gitLog, GitLogCommit} from '@services';
import {logStore, throwError} from './debug';
import {
  getSerializedErrorStr,
  PayloadSerializedError,
  StoreError,
} from '@types';

export const getGitLog = createAsyncThunk(
  'commits/getGitLog',
  async (_, {dispatch, getState}) => {
    logStore && console.log('store - getGitLog');
    if (throwError) throw Error('This is a test error code');

    const {repository} = getState() as any;
    const repo = repository.repo;
    if (!repo) return;
    const commits = await gitLog({repo});
    return commits;
  },
);

const initialState = {
  commits: [] as GitLogCommit[],
  // Unused AFAIK
  loading: 'idle',
  error: null as null | StoreError,
};

const commitsSlice = createSlice({
  name: 'commits',
  initialState,
  reducers: {
    clearLog() {
      return initialState;
    },
  },
  extraReducers: {
    [getGitLog.fulfilled.toString()]: (
      state,
      action: PayloadAction<GitLogCommit[]>,
    ) => {
      state.commits = action.payload;
    },

    [getGitLog.rejected.toString()]: (
      state,
      action: PayloadSerializedError,
    ) => {
      state.error = getSerializedErrorStr(action.error);
    },
  },
});

export const {clearLog} = commitsSlice.actions;
export const commitsReducer = commitsSlice.reducer;
