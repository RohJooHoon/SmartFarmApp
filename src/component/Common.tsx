import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface childrenProps {
  children: React.ReactNode;
}

const Body: React.FC<childrenProps> = ({children}) => {
  return <View style={styles.Body}>{children}</View>;
};

const Container: React.FC<childrenProps> = ({children}) => {
  return <View style={styles.Container}>{children}</View>;
};

const Title: React.FC<childrenProps> = ({children}) => {
  return (
    <View style={styles.Title}>
      <Text style={styles.TitleLeft}>{children}</Text>
    </View>
  );
};

const List: React.FC<childrenProps> = ({children}) => {
  return (
    <View style={styles.Title}>
      <Text style={styles.TitleLeft}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Body: {
    flex: 1,
    gap: 36,
    paddingVertical: 12,
    backgroundColor: '#101811',
  },
  Container: {
    gap: 10,
    backgroundColor: '#101811',
  },
  Title: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  TitleLeft: {
    flex: 1,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  List: {},
});

export {Body, Container, Title, List};
