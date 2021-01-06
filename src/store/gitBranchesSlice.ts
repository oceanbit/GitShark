import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '../constants';
import {
  RemoteBranch,
  Remotes,
  getSerializedErrorStr,
  PayloadSerializedError,
} from '@types';
import {logStore} from './debug';

const getRemotesAndBranchesFn = async (path: string) => {
  logStore && console.log('store - getRemotesAndBranchesFn');

  const remotes = await git.listRemotes({fs, dir: path});

  if (!remotes) return;

  const remoteBranchesArr = await Promise.all(
    remotes.map(async remote => {
      const branches = await git.listBranches({
        fs,
        dir: path,
        remote: remote.remote,
      });
      const remoteBranchesNames = branches.filter(branch => branch !== 'HEAD');

      return remoteBranchesNames.map(name => ({
        name: name,
        remote: remote.remote,
      }));
    }),
  );

  const remoteBranches = remoteBranchesArr.flat();

  return {remotes, remoteBranches};
};

export const getRemotesAndBranches = createAsyncThunk(
  'commits/getRemotesAndBranches',
  getRemotesAndBranchesFn,
);

export const getLocalBranches = createAsyncThunk(
  'commits/getLocalBranches',
  async (path: string) => {
    logStore && console.log('store - listBranches');
    return git.listBranches({fs, dir: path});
  },
);

export const getBranchData = createAsyncThunk(
  'commits/getLocalBranches',
  async (path: string, {dispatch}) => {
    logStore && console.log('store - getBranchData');

    dispatch(getLocalBranches(path));
    dispatch(getRemotesAndBranches(path));
  },
);

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type RemotesAndBranches = ThenArg<ReturnType<typeof getRemotesAndBranchesFn>>;

const initialState = {
  localBranches: [] as string[],
  remoteBranches: [] as RemoteBranch[],
  remotes: [] as Remotes[],
  // Unused AFAIK
  loading: 'idle',
  error: '' as string,
};

const branchesSlice = createSlice({
  name: 'commits',
  initialState,
  reducers: {
    clearBranches() {
      return initialState;
    },
  },
  extraReducers: {
    [getRemotesAndBranches.fulfilled.toString()]: (
      state,
      action: PayloadAction<RemotesAndBranches>,
    ) => {
      if (!action.payload) return;
      state.remotes = action.payload.remotes;
      state.remoteBranches = action.payload.remoteBranches;
    },
    [getLocalBranches.fulfilled.toString()]: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.localBranches = action.payload;
    },
    [getRemotesAndBranches.rejected.toString()]: (
      state,
      action: PayloadSerializedError,
    ) => {
      state.error = getSerializedErrorStr(action.error);
    },
    [getLocalBranches.rejected.toString()]: (
      state,
      action: PayloadSerializedError,
    ) => {
      state.error = getSerializedErrorStr(action.error);
    },
  },
});

export const {clearBranches} = branchesSlice.actions;
export const branchesReducer = branchesSlice.reducer;
