import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import GLOBAL from './global.js'
import botMove from './bot.js'


class Cell extends Component {
  _onPressButton = () => {
    if(GLOBAL.current === 'X'){
      GLOBAL.current = 'O';
      GLOBAL.gameState[this.props.cellNum] = 1;
      GLOBAL.numMoves++;
      this.props.handler("O's turn",this.props.cellNum);
    } else {
      GLOBAL.current = 'X';
      GLOBAL.gameState[this.props.cellNum] = 0;
      GLOBAL.numMoves++;
      this.props.handler("X's turn",this.props.cellNum);
    }
    this.forceUpdate();
  }

  render() {
    var cellImage;
    var disabled;
    if (GLOBAL.gameState[this.props.cellNum] === 1) {
      cellImage=require('./assets/X.png')
      disabled=true
    } else if (GLOBAL.gameState[this.props.cellNum] === 0) {
      cellImage=require('./assets/O.png')
      disabled=true
    } else {
      cellImage=require('./assets/B.png')
      disabled=false
    }

    return (
      <TouchableWithoutFeedback onPress={this._onPressButton} disabled={disabled||this.props.disableInput}>
        <Image source={cellImage} style={styles.cell}/>
      </TouchableWithoutFeedback>
      );
  }
}

export default class GameGrid extends Component {
  render() {
    return (
      <View>
        {/*First row*/}
        <View style={styles.cols}>
          <Cell cellNum={0} handler={this.props.handler} disableInput={this.props.disableInput}/>
          <Cell cellNum={1} handler={this.props.handler} disableInput={this.props.disableInput}/>
          <Cell cellNum={2} handler={this.props.handler} disableInput={this.props.disableInput}/>
        </View>
        {/*Second row*/}
        <View style={styles.cols}>
          <Cell cellNum={3} handler={this.props.handler} disableInput={this.props.disableInput}/>
          <Cell cellNum={4} handler={this.props.handler} disableInput={this.props.disableInput}/>
          <Cell cellNum={5} handler={this.props.handler} disableInput={this.props.disableInput}/>
        </View>
        {/*Third row*/}
        <View style={styles.cols}>
          <Cell cellNum={6} handler={this.props.handler} disableInput={this.props.disableInput}/>
          <Cell cellNum={7} handler={this.props.handler} disableInput={this.props.disableInput}/>
          <Cell cellNum={8} handler={this.props.handler} disableInput={this.props.disableInput}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rows: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

  cols: {
    flexDirection: 'row',
  },

  cell: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
