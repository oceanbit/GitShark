import {combineReducers} from '@reduxjs/toolkit';
import {databaseReducer} from './databaseSlice';
import {changesReducer} from './gitChangesSlice';
import {commitsReducer} from './gitLogSlice';
import {branchesReducer} from './gitBranchesSlice';

export const rootReducer = combineReducers({
  changes: changesReducer,
  commits: commitsReducer,
  database: databaseReducer,
  branches: branchesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
