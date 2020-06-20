import {useDispatch} from 'react-redux';
import {store} from '@store/store';

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
export type ThunkDispatchType = ReturnType<typeof useThunkDispatch>;
