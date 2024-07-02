import 'react-native-gesture-handler';
import 'react-native-devsettings';
import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './store';
import Header from '@/layout/Header';
import PageHome from './page/Home';
import PageList from './page/List';
import PageOption from './page/Option';
import PageBluetooth from './page/Bluetooth';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    const unsubscribe = navigationRef.addListener('state', (e) => {
      console.log('Navigation state changed:', e.data.state);
    });

    return unsubscribe;
  }, [navigationRef]);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
          <Header />
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, ...CardStyleInterpolators.forHorizontalIOS}}>
            <Stack.Screen name="Home" component={PageHome} />
            <Stack.Screen name="List" component={PageList} />
            <Stack.Screen name="Option" component={PageOption} />
            <Stack.Screen name="Bluetooth" component={PageBluetooth} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 최 외곽 컨테이너 배경
  },
});

export default App;
