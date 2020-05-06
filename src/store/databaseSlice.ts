import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createConnection, getConnectionManager} from 'typeorm';
import {Branch, Commit, Remote, Repo} from '../entities';

export const setupDatabase = createAsyncThunk(
  'database/setupDatabase',
  async (_, {rejectWithValue}) => {
    try {
      await createConnection({
        type: 'react-native',
        database: 'gitshark',
        location: 'default',
        logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [Branch, Commit, Remote, Repo],
      });
    } catch (err) {
      if (err.name === 'AlreadyHasActiveConnectionError') {
        getConnectionManager().get('default');
        return;
      }
      rejectWithValue(err.message || err);
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
