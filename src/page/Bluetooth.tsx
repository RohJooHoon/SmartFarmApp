import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {increment, decrement} from '@/store/counter';
import {StoreState} from '@/store';

const Bluetooth: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: StoreState) => state.counter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.text}>Bluetooth Screen</Text>
        <Text style={styles.text}>{count}</Text>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Bluetooth;
