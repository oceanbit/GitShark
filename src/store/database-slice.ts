import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createConnection, getConnectionManager} from 'typeorm';
import {Commit, Repo} from '@entities';
import {logStore} from './debug';

export const setupDatabase = createAsyncThunk(
  'database/setupDatabase',
  async (_, {rejectWithValue}) => {
    try {
      logStore && console.log('store - SETUP DB');
      await createConnection({
        type: 'react-native',
        database: 'gitshark',
        location: 'default',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [Commit, Repo],
      });
    } catch (err: unknown) {
      if ((err as any).name === 'AlreadyHasActiveConnectionError') {
        getConnectionManager().get('default');
        return;
      }
      rejectWithValue((err as any).message || err);
    }
  },
);

const databaseSlice = createSlice({
  name: 'database',
  initialState: {
    isLoaded: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [setupDatabase.fulfilled.toString()]: state => {
      state.isLoaded = true;
    },
    [setupDatabase.rejected.toString()]: (state, action) => {
      state.isLoaded = true;
      state.error = action.payload;
    },
  },
});

export const databaseReducer = databaseSlice.reducer;
