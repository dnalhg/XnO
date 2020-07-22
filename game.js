import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import GLOBAL from './global.js'
import GameGrid from './grid.js'
import gameStatus from './game_status.js'
import botMove from './bot.js'

export default class Game extends Component {
  state = {gameText:"",disableInput:false,displayAgain:"none"}

  componentDidMount() {
    if(GLOBAL.botValue===false) {
      this.setState({gameText:"X's turn"})
    } else {
      this.setState({gameText:"Your turn"})
      if(GLOBAL.botValue===1) {
        var index = botMove(GLOBAL.botValue);
        GLOBAL.gameState[index] = GLOBAL.botValue;
        GLOBAL.numMoves++;
        GLOBAL.current = 'O';
      }
    }
  }

  handler = (text,lastMove) => {
    var status;
    if(GLOBAL.botValue===false) {
      status = gameStatus(lastMove)
      if(status === true){
        this.setState({gameText:text})
      } else if (status === false) {
        this.setState({gameText:"It's a tie",disableInput:true,displayAgain:"flex"})
      } else {
        if(status === 1) {
          this.setState({gameText:'X wins'})
        } else {
          this.setState({gameText:'O wins'})
        }
        this.setState({disableInput:true,displayAgain:"flex"})
      }
    } else {
      status = gameStatus(lastMove)
      if (status === true) {
        var index;
        if(GLOBAL.botValue===1 && GLOBAL.current === 'X') {
            index = botMove(GLOBAL.botValue);
            GLOBAL.gameState[index] = GLOBAL.botValue;
            GLOBAL.numMoves++;
            GLOBAL.current = 'O';
        } else if (GLOBAL.botValue===0 && GLOBAL.current === 'O') {
            index = botMove(GLOBAL.botValue);
            GLOBAL.gameState[index] = GLOBAL.botValue;
            GLOBAL.numMoves++;
            GLOBAL.current = 'X';
        }
        status = gameStatus(index)
        if (status === true) {
          this.setState({gameText:'Your turn'})
        }
      }

      if (status === false) {
        this.setState({gameText:"It's a tie",disableInput:true,displayAgain:"flex"})
      } else if (status === 1 || status === 0) {
        if(status === 1) {
          if (GLOBAL.botValue === 1) {
            this.setState({gameText:'Bot wins'})
          } else {
            this.setState({gameText:'You win'})
          }
        } else {
          if (GLOBAL.botValue === 0) {
            this.setState({gameText:'Bot wins'})
          } else {
            this.setState({gameText:'You win'})
          }
        }
        this.setState({disableInput:true,displayAgain:"flex"})
      }
    }
  }

  _onPressButton = () => {
    GLOBAL.current = 'X';
    GLOBAL.gameState = [-1,-1,-1,-1,-1,-1,-1,-1,-1];
    GLOBAL.numMoves = 0;
    this.setState({disableInput:false,displayAgain:"none"});
    if(GLOBAL.botValue===false) {
      this.setState({gameText:"X's turn"})
    } else {
      this.setState({gameText:"Your turn"})
      if(GLOBAL.botValue===1) {
        var index = botMove(GLOBAL.botValue);
        GLOBAL.gameState[index] = GLOBAL.botValue;
        GLOBAL.numMoves++;
        GLOBAL.current = 'O';
      }
    }
    this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:36}}>{this.state.gameText}</Text>
        <GameGrid handler={this.handler} disableInput={this.state.disableInput}/>
        <TouchableOpacity onPress={this._onPressButton} style={[styles.button,{display:this.state.displayAgain}]}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  button: {
    backgroundColor: 'black'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 36
  }
});
