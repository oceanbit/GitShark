import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRepoStatus, ChangesArrayItem} from '@services';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '@constants';

export const getGitStatus = createAsyncThunk(
  'commits/getGitStatus',
  async (_, {getState}) => {
    const {database, repository} = getState() as any;
    if (!database.isLoaded) return;
    const repo = repository.repo;
    if (!repo) return;
    const newFiles = await getRepoStatus(repo.path);
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

export const addToStaged = createAsyncThunk(
  'commits/addToStaged',
  async (changes: ChangesArrayItem[], {getState}) => {
    const {repository} = getState() as any;
    const repo = repository.repo;
    if (!repo) return;
    return Promise.all(
      changes.map(change => {
        if (change.fileStatus === 'deleted') {
          // TODO: Remove when this is handled
          // https://github.com/isomorphic-git/isomorphic-git/issues/1099#issuecomment-653428486
          return git.remove({fs, dir: repo!.path, filepath: change.fileName});
        } else {
          return git.add({fs, dir: repo!.path, filepath: change.fileName});
        }
      }),
    );
  },
);

export const removeFromStaged = createAsyncThunk(
  'commits/removeFromStaged',
  async (changes: ChangesArrayItem[], {getState}) => {
    const {repository} = getState() as any;
    const repo = repository.repo;
    if (!repo) return;
    return Promise.all(
      changes.map(change => {
        if (change.fileStatus === 'deleted') {
          // TODO: Remove when this is handled
          // https://github.com/isomorphic-git/isomorphic-git/issues/1099#issuecomment-653428486
          return git.resetIndex({
            fs,
            dir: repo!.path,
            filepath: change.fileName,
          });
        } else {
          return git.remove({fs, dir: repo!.path, filepath: change.fileName});
        }
      }),
    );
  },
);

const initialState = {
  staged: [] as ChangesArrayItem[],
  unstaged: [] as ChangesArrayItem[],
  loading: 'idle',
};

const changesSlice = createSlice({
  name: 'changes',
  initialState,
  reducers: {
    clearChanges() {
      return initialState;
    },
  },
  extraReducers: {
    [getGitStatus.fulfilled.toString()]: (state, action) => {
      if (!action.payload) return;
      state.staged = action.payload.staged;
      state.unstaged = action.payload.unstaged;
    },
    [addToStaged.pending.toString()]: (
      state,
      action: {meta: {arg: ChangesArrayItem[]}},
    ) => {
      const changes = action.meta.arg;
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
      action: {meta: {arg: ChangesArrayItem[]}},
    ) => {
      const changes = action.meta.arg;
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

export const {clearChanges} = changesSlice.actions;
export const changesReducer = changesSlice.reducer;
