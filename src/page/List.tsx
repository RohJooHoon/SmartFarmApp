import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {increment, decrement} from '@/store/counter';
import {StoreState} from '@/store';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: StoreState) => state.counter);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>List Screen</Text>
      <Text style={styles.text}>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default List;
