# XnO
A naughts and crosses (aka Tic-Tac-Toe) app built on react-native that supports a 2-player mode and a single player mode against a bot. The bot plays using an optimal algorithm and can never lose. This app allowed me to learn about cross platform development using react-native.

## Optimal strategy
Developing the optimal strategy for the bot was the highlight of this project. In order to develop its strategy, I played naughts and crosses whilst dissecting my rationale behind each move. The bot decides its next move by using the following procedure:
1. Try to win if possible
2. Block the opponent's win if they will win in the next turn
3. Set up a two way win, that is, a scenario where on the next turn you will have 2 opportunities to win and where if your opponent blocks one opportunity, they cannot block the other opportunity, thus guaranteeing a win
4. Block your opponent from setting up a two way win
5. Place your token in the centre
6. Place your token in a corner
7. Place your token anywhere

## Areas for further work
- Introduce an option for online multiplayer. The bot could be used to (unethically) simulate online multiplayer in the case where there are no other players (as is often the case nowadays in many online "multiplayer" games).
- Introduce support and a bot for Ultimate Tic-Tac-Toe. The bot will probably require reinforcement learning to train.
