import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Grid from './Component/Grid';
import GameBoard from './Class/GameBoard.class';
import Header from './Component/Header';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      cards: [],
      columns: 0,
      rows: 0,
      timeLeft: -1,
      selectItems: [],
      score: 0
    }
  }

  componentDidMount = () => {
    this.generateGameBoard();
  }

  generateGameBoard = () => {
    const { level } = this.state;
    const gb = new GameBoard(level);
    const gameBoard = gb.generateGameBoard();

    this.setState({ cards: gameBoard.cards, columns: gameBoard.numCol, rows: gameBoard.numRow, timeLeft: gameBoard.maxTime });
    this.perMatchScore = gameBoard.perMatchScore;
    this.startTimer();
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const timeLeft = this.state.timeLeft - 1;
      this.setState({ timeLeft }, () => {
        if (timeLeft == 0) {
          this.endTimer();
          this.timeout();
        }
      })
    }, 1000);
  }

  endTimer = () => {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  nextGame = () => {
    const { level, score } = this.state;

    this.endTimer();
    Alert.alert(
      `Level ${level} completed`,
      `Let\'s play next level. \n Current Score: ${score}`,
      [{
        text: 'Play', onPress: () => this.loadNextLevel(1)
      }]
      ,
      { cancelable: false })
  }

  timeout = () => {
    Alert.alert(
      `Timeout !!!`,
      `Play again`,
      [{
        text: 'Play', onPress: this.loadNextLevel
      }]
      ,
      { cancelable: false })
  }

  loadNextLevel = (increment = 0) => {
    this.setState({ level: this.state.level + increment, cards: [], columns: 0, rows: 0, timeLeft: -1, selectItems: [] }, this.generateGameBoard)
  }

  onPressCard = (card) => {
    if (this.state.selectItems.length < 2) {
      this.setCardState(card, true, this.pushIndexToSelected)
    }
  }

  pushIndexToSelected = (index) => {
    this.setState({ selectItems: [...this.state.selectItems, index] }, () => {
      setTimeout(this.handleMatchingCards, 1000);
    })
  }

  handleMatchingCards = () => {
    const { selectItems, cards } = this.state;

    if (selectItems.length == 2) {
      const firstCard = cards[selectItems[0]];
      const secondCard = cards[selectItems[1]];

      if (firstCard.content == secondCard.content) {
        this.markMatched(firstCard);
        this.markMatched(secondCard);
        this.increaseScore();
        this.checkIfCompleted();
        this.clearSelected();
      } else {
        this.setCardState(firstCard, false);
        this.setCardState(secondCard, false);
        this.clearSelected();
      }
    }
  }

  clearSelected = () => {
    this.setState({ selectItems: [] })
  }

  increaseScore = () => {
    this.setState({ score: this.state.score + this.perMatchScore })
  }

  checkIfCompleted = () => {
    const { cards } = this.state;

    const cardIndexes = Object.keys(cards);
    for (let i = 0; i < cardIndexes.length; i++) {
      if (!cards[cardIndexes[i]].matched) {
        return;
      }
    }

    this.nextGame();
  }

  markMatched = (card) => {
    this.setState({ cards: { ...this.state.cards, [card.index]: { ...card, matched: true } } })
  }

  setCardState = (card, status, callback = () => { }) => {
    const index = card.index;
    this.setState({ cards: { ...this.state.cards, [index]: { ...card, open: status } } }, () => callback(index))
  }

  render() {
    const { rows, columns, cards, score, timeLeft, level } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer} >
          <Header
            level={level}
            score={score}
            timeLeft={timeLeft}
          />
        </View>
        <View style={styles.boardContainerr} >
          <Grid
            rows={rows}
            columns={columns}
            cards={cards}
            onPressCard={this.onPressCard}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  boardContainerr: {
    flex: 5,
    padding: 20
  },
  headerContainer: {
    flex: 1.2,
    padding: 20
  }
});
