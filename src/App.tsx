import 'react-native-gesture-handler';
import 'react-native-devsettings';
import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BluetoothProvider from '@/component/Bluetooth';
import store from './store';
import PageHome from './page/Home';
import PageDetail from './page/Detail';
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
      <BluetoothProvider>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView style={styles.wrapper} edges={['top', 'left', 'right']}>
            <StatusBar backgroundColor="#101811" barStyle="light-content" />
            <Stack.Navigator
              initialRouteName="CubeBrio"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#101811', // 헤더 배경색
                  borderBottomWidth: 0, // 하단 라인을 없앱니다.
                  elevation: 0, // 안드로이드에서 그림자를 없앱니다.
                  shadowOpacity: 0, // iOS에서 그림자를 없앱니다.
                },
                headerTintColor: '#FFFFFF', // 헤더 텍스트 색상
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
                  return <MaterialIcons name="keyboard-arrow-left" size={26} color="#FFFFFF" style={style} />;
                },
                ...CardStyleInterpolators.forHorizontalIOS,
              }}>
              <Stack.Screen
                name="CubeBrio"
                component={PageHome}
                options={{
                  title: 'CubeBrio',
                  headerRight: () => (
                    <TouchableOpacity style={styles.button}>
                      <MaterialIcons name="refresh" size={26} style={styles.buttonIcon} />
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen
                name="Detail"
                component={PageDetail}
                options={{
                  title: 'Detail',
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
        </NavigationContainer>
      </BluetoothProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#101811',
  },
  button: {
    flex: 1,
    justifyContent: 'center', // 세로 축에서 중앙 정렬
    alignItems: 'center', // 가로 축에서 중앙 정렬
    width: 42,
    height: 42,
  },
  buttonIcon: {
    color: '#FFFFFF',
  },
  buttonText: {
    marginTop: 5,
  },
});

export default App;
