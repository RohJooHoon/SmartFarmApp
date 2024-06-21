import React from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, Text, Button} from 'react-native';
import store from './src/store';

// counter 값 로드
import {StoreState} from './src/store';
import {increment, decrement} from './src/store/counter';


const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: StoreState) => state.counter);

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
