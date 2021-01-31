import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {gitLog, GitLogCommit, gitCommitToDBMapper} from '@services';
import {Repo} from '@entities';
import {logStore, throwError} from './debug';
import {
  getSerializedErrorStr,
  PayloadSerializedError,
  StoreError,
} from '@types';

interface StoreGitLogPayload {
  repo: Repo;
  commits: GitLogCommit[];
}
export const storeGitLog = createAsyncThunk(
  'commits/storeGitLog',
  async ({repo, commits}: StoreGitLogPayload) => {
    logStore && console.log('store - storeGitLog');

    repo.commits = commits
      .slice(0, 5)
      .map(commit =>
        gitCommitToDBMapper({commit, oid: commit.oid, payload: ''}),
      );

    repo.lastUpdated = new Date(Date.now());
    await repo.save();
  },
);

export const getGitLog = createAsyncThunk(
  'commits/getGitLog',
  async (_, {dispatch, getState}) => {
    logStore && console.log('store - getGitLog');
    if (throwError) throw Error('This is a test error code');

    const {repository} = getState() as any;
    const repo = repository.repo;
    if (!repo) return;
    const commits = await gitLog({repo});
    dispatch(storeGitLog({repo, commits}));
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
