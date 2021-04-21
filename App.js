import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Home from './Home';
import Dashboard from './Dashboard';
import { Alert } from 'react-native';

const Stack = createStackNavigator();
const API_KEY = "RGAPI-471f1f1a-44d2-4bc8-9ae7-7aa434ab2e5e";

const App = () => {
  let runeData = {};
  axios.get(`http://ddragon.leagueoflegends.com/cdn/10.16.1/data/ko_KR/runesReforged.json`)
    .then((res) => {
      const runeResData = res.data; // []
      runeResData.map((item) => {
        runeData[item.id] = item.icon;
        // console.log(item);
      });
    })
    .catch((res) => { if ('undefined' === typeof res.data || res.data.status >= 400) { Alert.alert('룬 데이터 에러' + res); console.log(res); }  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <Home {...props} apiKey={API_KEY} />}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {props => <Dashboard {...props} apiKey={API_KEY} runeData={runeData} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;