import 'react-native-gesture-handler';
import React, {Component} from 'react';
import Game from './game.js';
import Home from './home.js'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title:""}}/>
          <Stack.Screen name="Game" component={Game} options={{title:""}}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
