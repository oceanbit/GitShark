import {useDispatch} from 'react-redux';
import {store} from '../store';

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();
