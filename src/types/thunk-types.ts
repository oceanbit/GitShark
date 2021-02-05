import {PayloadAction, SerializedError} from '@reduxjs/toolkit';
import {StoreError} from '@types';

export type PayloadSerializedError = PayloadAction<
  void,
  string,
  never,
  SerializedError | string
>;

export const getSerializedErrorStr = (e: SerializedError | Error | string) => {
  if (typeof e === 'string') {
    const [msg, ...stack] = e.split('\n');
    return {
      errorMessage: msg,
      callStack: stack.join('\n'),
    };
  }

  return {
    errorMessage: `${e.name} - ${e.message}`,
    callStack: e.stack,
  } as StoreError;
};
