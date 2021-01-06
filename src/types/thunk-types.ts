import {PayloadAction, SerializedError} from '@reduxjs/toolkit';

export type PayloadSerializedError = PayloadAction<
  void,
  string,
  never,
  SerializedError | string
>;

export const getSerializedErrorStr = (e: SerializedError | string) => {
  if (typeof e === 'string') {
    return e;
  }
  return `${e.name}\n${e.message}\n${e.stack}`;
};
