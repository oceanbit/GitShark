import {combineReducers} from '@reduxjs/toolkit';
import {changesReducer} from './gitChangesSlice';

export const rootReducer = combineReducers({
  changes: changesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
