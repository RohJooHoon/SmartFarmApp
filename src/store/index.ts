import {configureStore, combineReducers} from '@reduxjs/toolkit';
import counter from './counter';

const store = configureStore({
  reducer: combineReducers({
    counter: counter.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
export default store;
