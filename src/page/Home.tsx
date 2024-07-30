import React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {increment, decrement} from '@/store/counter';
import {StoreState} from '@/store';
import {Body, Container, Title} from '@/component/Common';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: StoreState) => state.counter);

  return (
    <Body>
      <Container>
        <Title>검색 리스트</Title>
        <Text>Home Screen</Text>
        <Text>{count}</Text>
        <Button title="Increment" onPress={() => dispatch(increment())} />
        <Button title="Decrement" onPress={() => dispatch(decrement())} />
      </Container>
    </Body>
  );
};

export default Home;
