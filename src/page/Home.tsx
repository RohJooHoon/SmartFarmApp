import React from 'react';
import {Body, Container, Title, List, Item} from '@/component/Common';

const Home: React.FC = () => {
  return (
    <Body>
      <Container>
        <Title>검색 리스트</Title>
        <List>
          <Item
            textButton="연결"
            subtitle="UUID : 2877188290"
            clickEvent={() => {
              console.log('dddd');
            }}>
            식물 재배 큐브 1
          </Item>
          <Item
            textButton="연결"
            subtitle="UUID : 2877188291"
            clickEvent={() => {
              console.log('dddd');
            }}>
            식물 재배 큐브 2
          </Item>
          <Item
            textButton="연결"
            subtitle="UUID : 2877188292"
            clickEvent={() => {
              console.log('dddd');
            }}>
            식물 재배 큐브 3
          </Item>
        </List>
      </Container>
    </Body>
  );
};

export default Home;
