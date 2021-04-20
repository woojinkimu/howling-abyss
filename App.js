import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Dashboard from './Dashboard';

const Stack = createStackNavigator();

const App = () => {

  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {props => <Dashboard {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;