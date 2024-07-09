import 'react-native-gesture-handler';
import 'react-native-devsettings';
import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BluetoothProvider from '@/component/Bluetooth';
import store from './store';
import PageHome from './page/Home';
import PageList from './page/List';
import PageOption from './page/Option';
import PageBluetooth from './page/Bluetooth';
import Navigation from '@/component/Navigation';

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
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <StatusBar backgroundColor="#f0f0f0" barStyle="dark-content" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#fff', // 헤더 배경색
              },
              headerTintColor: '#333', // 헤더 텍스트 색상
              headerTitleStyle: {
                fontWeight: 'bold', // 헤더 텍스트 스타일
              },
              headerTitleAlign: 'center',
              headerBackTitleVisible: true,
              headerBackTitle: ' ',
              headerBackImage: () => {
                const style = {
                  marginRight: 5,
                  marginLeft: 11,
                };
                return <MaterialCommunityIcons name="arrow-left" size={26} color="#333" style={style} />;
              },
              ...CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen
              name="Home"
              component={PageHome}
              options={{
                title: 'HOME',
                headerRight: () => (
                  <TouchableOpacity onPress={() => console.log('This is a button!')} style={{marginRight: 10}}>
                    <Text>test</Text>
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="List"
              component={PageList}
              options={{
                title: 'LIST',
              }}
            />
            <Stack.Screen
              name="Option"
              component={PageOption}
              options={{
                title: 'OPTION',
              }}
            />
            <Stack.Screen
              name="Bluetooth"
              component={PageBluetooth}
              options={{
                title: 'BLUETOOTH',
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
        <View style={styles.navigation}>
          <Navigation />
        </View>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 최 외곽 컨테이너 배경
  },
  navigation: {},
});

export default App;
