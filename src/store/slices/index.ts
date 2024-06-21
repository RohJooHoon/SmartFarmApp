import {createSlice, combineReducers} from '@reduxjs/toolkit';

// Counter slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },
});

export const {increment, decrement} = counterSlice.actions;

// Root reducer
const rootReducer = combineReducers({
  counter: counterSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
