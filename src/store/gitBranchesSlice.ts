import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import git from 'isomorphic-git/index.umd.min.js';
import {fs} from '../constants';

const getRemotesAndBranchesFn = async (path: string) => {
  const remotes = await git.listRemotes({fs, dir: path});

  if (!remotes) return;

  const remoteBranchesArr = await Promise.all(
    remotes.map(async remote => {
      const name = await git.listBranches({
        fs,
        dir: path,
        remote: remote.remote,
      });
      return {
        name: name[name.length - 1],
        remote: remote.remote,
      };
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
    return git.listBranches({fs, dir: path});
  },
);

export const getBranchData = createAsyncThunk(
  'commits/getLocalBranches',
  async (path: string, {dispatch}) => {
    dispatch(getLocalBranches(path));
    dispatch(getRemotesAndBranches(path));
  },
);

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

type RemotesAndBranches = ThenArg<ReturnType<typeof getRemotesAndBranchesFn>>;

const branchesSlice = createSlice({
  name: 'commits',
  initialState: {
    localBranches: [] as string[],
    remoteBranches: [] as {
      name: string;
      remote: string;
    }[],
    remotes: [] as {
      remote: string;
      url: string;
    }[],
    loading: 'idle',
  },
  reducers: {},
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
  },
});

export const branchesReducer = branchesSlice.reducer;
