import React from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp, useRoute, RouteProp} from '@react-navigation/native';

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  type RootStackParamList = {
    Home: undefined;
    List: undefined;
    Option: undefined;
  };

  return (
    <View style={styles.header}>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
      <Button title="List" onPress={() => navigation.navigate('List')} />
      <Button title="Option" onPress={() => navigation.navigate('Option')} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});

export default Header;
