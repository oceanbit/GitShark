import {combineReducers} from '@reduxjs/toolkit';
import {databaseReducer} from './databaseSlice';
import {changesReducer} from './gitChangesSlice';
import {commitsReducer} from './gitLogSlice';

export const rootReducer = combineReducers({
  changes: changesReducer,
  commits: commitsReducer,
  database: databaseReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
