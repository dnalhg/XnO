import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import GLOBAL from './global.js'

export default class Home extends Component {

  navigateToGame = () => {
    GLOBAL.current = 'X';
    GLOBAL.gameState = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
    GLOBAL.numMoves = 0;
    GLOBAL.botValue = false;
    this.props.navigation.navigate('Game')
  }

  navigateToGameBotX = () => {
    GLOBAL.current = 'X';
    GLOBAL.gameState = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
    GLOBAL.numMoves = 0;
    GLOBAL.botValue = 1;
    this.props.navigation.navigate('Game')
  }

  navigateToGameBotO = () => {
    GLOBAL.current = 'X';
    GLOBAL.gameState = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
    GLOBAL.numMoves = 0;
    GLOBAL.botValue = 0;
    this.props.navigation.navigate('Game')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.navigateToGame} style={styles.button}>
          <Text style={styles.buttonText}>2 Players</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToGameBotO} style={styles.button}>
          <Text style={styles.buttonText}>1 Player (You go first)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToGameBotX} style={styles.button}>
          <Text style={styles.buttonText}>1 Player (Bot goes first)</Text>
        </TouchableOpacity>
        <Image source={require('./assets/X.png')} style={{display:"none"}}/>
        <Image source={require('./assets/O.png')} style={{display:"none"}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    backgroundColor: 'black',
    width: 400,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  }
});
