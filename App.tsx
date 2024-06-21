import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store';
import { SafeAreaView, Text, Button } from 'react-native';
import { RootState } from './src/store/slices';
import { increment, decrement } from './src/store/slices';

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter);

  return (
    <SafeAreaView>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </SafeAreaView>
  );
};

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;