import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getRepoStatus,
  ChangesArrayItem,
  addToStaged as addToStagedService,
  removeFromStaged as removeFromStagedService,
} from '@services';
import {logStore} from './debug';
import {
  getSerializedErrorStr,
  PayloadSerializedError,
  StoreError,
} from '@types';

export const getGitStatus = createAsyncThunk(
  'commits/getGitStatus',
  async (_, {getState}) => {
    logStore && console.log('store - getGitStatus');

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
    logStore && console.log('store - addToStaged');

    const {repository} = getState() as any;
    const repo = repository.repo;
    if (!repo) return;
    return addToStagedService({repo, changes});
  },
);

export const removeFromStaged = createAsyncThunk(
  'commits/removeFromStaged',
  async (changes: ChangesArrayItem[], {getState}) => {
    logStore && console.log('store - removeFromStaged');

    const {repository} = getState() as any;
    const repo = repository.repo;
    if (!repo) return;
    return removeFromStagedService({repo, changes});
  },
);

const initialState = {
  staged: [] as ChangesArrayItem[],
  unstaged: [] as ChangesArrayItem[],
  // Unused AFAIK
  loading: 'idle',
  error: null as null | StoreError,
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

    [getGitStatus.rejected.toString()]: (
      state,
      action: PayloadSerializedError,
    ) => {
      state.error = getSerializedErrorStr(action.error);
    },

    [addToStaged.rejected.toString()]: (
      state,
      action: PayloadSerializedError,
    ) => {
      state.error = getSerializedErrorStr(action.error);
    },

    [removeFromStaged.rejected.toString()]: (
      state,
      action: PayloadSerializedError,
    ) => {
      state.error = getSerializedErrorStr(action.error);
    },
  },
});

export const {clearChanges} = changesSlice.actions;
export const changesReducer = changesSlice.reducer;
