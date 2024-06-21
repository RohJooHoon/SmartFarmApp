import {configureStore, combineReducers} from '@reduxjs/toolkit';
import counterSlice from './counter';

const store = configureStore({
  reducer: combineReducers({
    counter: counterSlice.reducer,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
export default store;
