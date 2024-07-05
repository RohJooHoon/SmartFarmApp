import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import counter from './counter';
import bluetooth from './bluetooth';

const store = configureStore({
  reducer: combineReducers({
    counter: counter.reducer,
    bluetooth: bluetooth.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
export default store;
