import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRepoStatus, ChangesArrayItem} from '../services';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '../constants';
import {Repo} from '../entities';
import {RootState} from './rootReducer';

export const getGitStatus = createAsyncThunk(
  'commits/getGitStatus',
  async (path: string, {getState}) => {
    const {database} = getState() as RootState;
    if (!database.isLoaded) return;
    const newFiles = await getRepoStatus(path);
    const onlyChangedFiles = newFiles.filter(
      file => file.fileStatus !== 'unmodified',
    );
    const [unstaged, staged] = onlyChangedFiles.reduce(
      (prev, change) => {
        if (!change.staged) {
          prev[0].push(change);
        } else {
          prev[1].push(change);
        }
        return prev;
      },
      [[], []] as ChangesArrayItem[][],
    );
    return {unstaged, staged};
  },
);

interface StagedChangesPayload {
  repo: Repo;
  changes: ChangesArrayItem[];
}

export const addToStaged = createAsyncThunk(
  'commits/addToStaged',
  async ({repo, changes}: StagedChangesPayload) => {
    return Promise.all(
      changes.map(change =>
        git.add({fs, dir: repo!.path, filepath: change.fileName}),
      ),
    );
  },
);

export const removeFromStaged = createAsyncThunk(
  'commits/removeFromStaged',
  async ({repo, changes}: StagedChangesPayload) => {
    return Promise.all(
      changes.map(change =>
        git.remove({fs, dir: repo!.path, filepath: change.fileName}),
      ),
    );
  },
);

const changesSlice = createSlice({
  name: 'changes',
  initialState: {
    staged: [] as ChangesArrayItem[],
    unstaged: [] as ChangesArrayItem[],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [getGitStatus.fulfilled.toString()]: (state, action) => {
      state.staged = action.payload.staged;
      state.unstaged = action.payload.unstaged;
    },
    [addToStaged.pending.toString()]: (
      state,
      action: {meta: {arg: StagedChangesPayload}},
    ) => {
      const {changes} = action.meta.arg;
      const newUnstaged = state.unstaged.filter(
        unChange =>
          !changes.find(change => unChange.fileName === change.fileName),
      );
      const newStaged = [...state.staged, ...changes];
      state.staged = newStaged;
      state.unstaged = newUnstaged;
    },
    [removeFromStaged.pending.toString()]: (
      state,
      action: {meta: {arg: StagedChangesPayload}},
    ) => {
      const {changes} = action.meta.arg;
      const newStaged = state.staged.filter(
        unChange =>
          !changes.find(change => unChange.fileName === change.fileName),
      );
      const newUnstaged = [...state.unstaged, ...changes];
      state.staged = newStaged;
      state.unstaged = newUnstaged;
    },
  },
});

export const changesReducer = changesSlice.reducer;
