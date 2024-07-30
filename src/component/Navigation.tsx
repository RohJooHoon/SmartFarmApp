import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
  Option: undefined;
  Bluetooth: undefined;
};

const Navigation: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.Navigation}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <MaterialIcons name="home" size={24} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Detail')}>
        <MaterialIcons name="detail" size={24} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Detail</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Option')}>
        <MaterialIcons name="settings" size={24} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Option</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bluetooth')}>
        <MaterialIcons name="bluetooth" size={24} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Bluetooth</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    paddingBottom: 30,
    backgroundColor: '#f8f8f8',
  },
  button: {
    alignItems: 'center',
  },
  buttonIcon: {
    color: '#666',
  },
  buttonText: {
    marginTop: 5,
  },
});

export default Navigation;
