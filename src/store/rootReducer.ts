import {combineReducers} from '@reduxjs/toolkit';
import {changesReducer} from './gitChangesSlice';
import {commitsReducer} from './gitLogSlice';

export const rootReducer = combineReducers({
  changes: changesReducer,
  commits: commitsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
