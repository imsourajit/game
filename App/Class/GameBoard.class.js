import { CreateArrayOfSize, ShuffleArray, CalculateRowAndColumn } from "../Utils/common";

class GameBoard {
    constructor(level = 1) {
        this.level = level;
    }

    generateGameBoard = () => {
        const { level } = this;
        const numOfCards = 2 * (level + 1);
        const maxTime = 60 * Math.round(numOfCards / 4);
        const { rows, columns } = CalculateRowAndColumn(numOfCards)
        const perMatchScore = level * 2;

        return {
            numRow: rows,
            numCol: columns,
            maxTime: maxTime,
            perMatchScore: perMatchScore,
            cards: this.generateCards(rows, columns, numOfCards)
        }
    }


    generateCards = (rows, columns, numOfCards) => {
        const cards = {};
        const numbersArray = CreateArrayOfSize(numOfCards / 2);
        let i = 0;
        const cardsNumbersArray = ShuffleArray([...numbersArray, ...numbersArray]);

        CreateArrayOfSize(rows).forEach((row) => {
            CreateArrayOfSize(columns).forEach((column) => {
                cards[`${row},${column}`] = { index: `${row},${column}`, content: cardsNumbersArray[i], open: false, matched: false }
                i++;
            })
        })

        return cards;
    }
}

export default GameBoard;
