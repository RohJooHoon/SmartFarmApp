import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

const Header: React.FC = () => {
  type RootStackParamList = {
    Home: undefined;
    List: undefined;
    Option: undefined;
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
