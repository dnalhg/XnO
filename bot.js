import GLOBAL from './global.js'

export default function botMove(botValue) {
  //Returns the index the bot should move to

  var oppValue = (botValue+1)%2
  var i;
  //Check if the bot has any winning move and attempts to win
  if((i=detectWinGlobal(GLOBAL.gameState,botValue))!==false) {
    return i
  }
  //Check if the opponent has any winning moves and then blocks
  if((i=detectWinGlobal(GLOBAL.gameState,oppValue))!==false) {
    return i
  }
  //Attempts to make a fork
  if((i=detectFork(GLOBAL.gameState,botValue))!==false) {
    return i
  }
  //Attempts to block an opponent fork
  //Accounts for initial scenario when opponent has 2 corners
  if(GLOBAL.numMoves===3 && botValue===0) {
    if(GLOBAL.gameState[0]===GLOBAL.gameState[8] && GLOBAL.gameState[0]===1) {
      return 1
    }
    if(GLOBAL.gameState[2]===GLOBAL.gameState[6] && GLOBAL.gameState[2]===1) {
      return 1
    }
  }
  if((i=detectFork(GLOBAL.gameState,oppValue))!==false) {
    return i
  }
  //Places in the center
  if(GLOBAL.gameState[4]===-1) {
    return 4
  }
  //Places in a corner opposite the opponent if there is an opponent in a corner
  if((i=detectCorner(GLOBAL.gameState,oppValue))!==false) {
    return i
  }
  //Bot places in any empty corner
  if((i=findEmptyCorner(GLOBAL.gameState))!==false) {
    return i
  }
  //Bot places in any empty side
  if((i=findEmptySide(GLOBAL.gameState))!==false) {
    return i
  }
}

function detectFork(gameBoard, value) {
  //Given the gameboard finds if a fork can be made with the given value
  //Returns the index for the fork to be made
  //Returns false otherwise
  var i;
  for (i=0; i<9; i++) {
    if(gameBoard[i]===-1) {
      var count = 0;
      gameBoard[i] = value

      var startIndex = i - i%3;
      if(detectWin([gameBoard[startIndex],gameBoard[startIndex+1],gameBoard[startIndex+2]],value)!==false) {
        count++;
      }
      if(detectWin([gameBoard[i],gameBoard[(i+3)%9],gameBoard[(i+6)%9]],value)!==false) {
        count++;
      } if(i%2===0) {
        if(i%4===0) {
          if(detectWin([gameBoard[0],gameBoard[4],gameBoard[8]],value)!==false) {
            count++;
          }
        } else {
          if(detectWin([gameBoard[2],gameBoard[4],gameBoard[6]],value)!==false) {
            count++;
          }
        }
      }
      gameBoard[i] = -1

      if(count>1) {
        return i
      }
    }
  }

  return false
}

function findEmptySide(gameBoard) {
  //Given the gameboard finds the first empty side
  //Returns the index of the empty side
  //Returns false otherwise
  if(GLOBAL.gameState[1]===-1) {
    return 1
  }
  if(GLOBAL.gameState[3]===-1) {
    return 3
  }
  if(GLOBAL.gameState[5]===-1) {
    return 5
  }
  if(GLOBAL.gameState[7]===-1) {
    return 7
  }
  return false
}

function findEmptyCorner(gameBoard) {
  //Given the gameboard finds the first empty corner
  //Returns the index of the empty corner
  //Returns false otherwise
  if(GLOBAL.gameState[0]===-1) {
    return 0
  }
  if(GLOBAL.gameState[2]===-1) {
    return 2
  }
  if(GLOBAL.gameState[6]===-1) {
    return 6
  }
  if(GLOBAL.gameState[8]===-1) {
    return 8
  }
  return false
}

function detectCorner(gameBoard,value) {
  //Given gameboard checks if the supplied value exists in a corner
  //Returns the index of the opposite corner if a corner is occupied
  //Returns false otherwise
  if(gameBoard[0]===value && gameBoard[8]===-1) {
    return 8
  }
  if(gameBoard[8]===value && gameBoard[0]===-1) {
    return 0
  }
  if(gameBoard[2]===value && gameBoard[6]===-1) {
    return 6
  }
  if(gameBoard[6]===value && gameBoard[2]===-1) {
    return 2
  }
  return false
}

function detectWinGlobal(gameBoard,value) {
  //Given the game board checks if a winning move exists for the supplied value
  //Returns winning index, token
  //Returns false otherwise

  var i;
  //Detecting wins horizontally
  if((i=detectWin([gameBoard[0],gameBoard[1],gameBoard[2]],value))!==false) {
    return i%3
  }
  if((i=detectWin([gameBoard[3],gameBoard[4],gameBoard[5]],value))!==false) {
    return 3+i%3
  }
  if((i=detectWin([gameBoard[6],gameBoard[7],gameBoard[8]],value))!==false) {
    return 6+i%3
  }

  //Detecting wins vertically
  if((i=detectWin([gameBoard[0],gameBoard[3],gameBoard[6]],value))!==false) {
    return 3*(i%3)
  }
  if((i=detectWin([gameBoard[1],gameBoard[4],gameBoard[7]],value))!==false) {
    return 1+3*(i%3)
  }
  if((i=detectWin([gameBoard[2],gameBoard[5],gameBoard[8]],value))!==false) {
    return 2+3*(i%3)
  }

  //Detecting wins along the diagonals
  if((i=detectWin([gameBoard[0],gameBoard[4],gameBoard[8]],value))!==false) {
    return 4*(i%3)
  }
  if((i=detectWin([gameBoard[2],gameBoard[4],gameBoard[6]],value))!==false) {
    return 2*(1+i%3)
  }

  return false
}

function detectWin(list,value) {
  //Given a line of the game board (a list of 3) and a value
  //checks if a winning move exists
  //Returns the winning index if possible
  //Returns false otherwise
  if(list[0]===list[1] && list[2]===-1 && list[0]===value) {
    return 2
  }
  if(list[0]===list[2] && list[1]===-1 && list[0]===value) {
    return 1
  }
  if(list[1]===list[2] && list[0]===-1 && list[1]===value) {
    return 0
  }
  return false
}
