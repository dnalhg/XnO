import GLOBAL from './global.js'

export default function gameStatus(lastMove) {
  //Returns true if the game is still continuing
  //Returns false if the game is a tie
  //Otherwise returns the winner
  var token = GLOBAL.gameState[lastMove]

  //Checking horizontal direction
  var startIndex = lastMove - lastMove%3
  if(
    GLOBAL.gameState[startIndex] === token &&
    GLOBAL.gameState[startIndex+1] === token &&
    GLOBAL.gameState[startIndex+2] === token
  ) {
    return token
  }

  //Checking vertical direction
  if(
    GLOBAL.gameState[(lastMove+3)%9] === token &&
    GLOBAL.gameState[(lastMove+6)%9] === token
  ) {
    return token
  }

  //Checking diagonal direction
  if(lastMove%2===0) {
    if(lastMove%4===0) {
      //We check diagonal from top left to bottom right
      if(
        GLOBAL.gameState[0] === token &&
        GLOBAL.gameState[4] === token &&
        GLOBAL.gameState[8] === token
      ) {
        return token
      }
    } else {
      //We check diagonal from top right to bottom left
      if(
        GLOBAL.gameState[2] === token &&
        GLOBAL.gameState[4] === token &&
        GLOBAL.gameState[6] === token
      ) {
        return token
      }
    }
  }
  if(GLOBAL.numMoves === 9) {
    return false
  }
  return true
}
