import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './store';
import PageHome from './page/Home';
import PageList from './page/List';
import PageOption from './page/Option';

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
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={PageHome} />
          <Stack.Screen name="List" component={PageList} />
          <Stack.Screen name="Option" component={PageOption} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
