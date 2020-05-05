import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {gitLog, GitLogCommit, gitCommitToDBMapper} from '../services';
import {Repo} from '../entities';

interface StoreGitLogPayload {
  repo: Repo;
  commits: GitLogCommit[];
}
export const storeGitLog = createAsyncThunk(
  'commits/storeGitLog',
  async ({repo, commits}: StoreGitLogPayload) => {
    repo.commits = commits
      .slice(0, 5)
      .map(commit =>
        gitCommitToDBMapper({commit, oid: commit.oid, payload: ''}),
      );
    await repo.save();
  },
);

export const getGitLog = createAsyncThunk(
  'commits/getGitLog',
  async (repo: Repo, {dispatch}) => {
    const commits = await gitLog({repo});
    dispatch(storeGitLog({repo, commits}));
    return commits;
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
