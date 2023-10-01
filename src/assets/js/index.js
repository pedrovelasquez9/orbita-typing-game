import { getRandomValue, getRandomWordArray, removeAllChildNodes } from './utils.js';
import { wordArray } from './data.js';

//create word array 
let wordSet = [];
let actualWord = [];
let splittedActualWord = [];
let writtingWord = '';
let completedWords = [];
let wordList = [];
let score = 0;
let scoreToWin = 100;
const defaultLevelArrayLength = 10;
const defaultFallDuration = 33;
const wordContainerElement = document.querySelector('#word');
const scoreDomNode = document.querySelector("#score");
const loseModal = document.querySelector("#lose-dialog");
const losingScoreElement = document.querySelector("#losing-score");
const winModal = document.querySelector("#win-dialog");

const registerRestartEvent = () => {
    document.querySelectorAll('.restart-btn').forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            restartGame();
        })
    })
};

const initializeWordArray = () => {
    wordSet = Array.from(new Set(structuredClone(wordArray)));
}

const checkIfUserLoses = () => {
    // validate if word is bellow viewport height as it falls 
    addEventListener("animationend", (event) => {
        const { offsetTop } = event.target;
        if (offsetTop < 0) {
            removeAllChildNodes(wordContainerElement);
            losingScoreElement.innerText = `Tu puntuación fue de: ${score} palabras`;
            loseModal.showModal();
        }
    });
}

const showWinnerMessage = () => {
    winModal.showModal();
}

const restartGame = () => {
    winModal.close();
    loseModal.close();
    initGame();
}

const showWordsInDom = () => {
    wordList = getRandomWordArray(wordSet, defaultLevelArrayLength);
    console.log(wordList)
    wordList.forEach((word, index) => {
        const spannedWord = buildWordDomNode(word, index);
        wordContainerElement.appendChild(spannedWord);
    });
};

const buildWordDomNode = (word) => {
    const wordElement = document.createElement('div');
    const wordElementCount = document.querySelectorAll('.word-div').length;
    const horizontalPosition = `${getRandomValue(80, 10)}%`;
    const fallDelay = `${wordElementCount * 1.5}s`;
    const fallDuration = `${defaultFallDuration - ((score / defaultLevelArrayLength) * 3)}s`;
    wordElement.id = word;
    wordElement.classList = 'word-div';
    wordElement.style.animation = `fall ${fallDuration} ${fallDelay} linear`;
    wordElement.style.right = horizontalPosition;

    word.split('').forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerText = letter;
        wordElement.appendChild(letterElement);
    });

    return wordElement;
}

const shoot = () => {
    const { x, y } = document.querySelector(`#${writtingWord}`).getBoundingClientRect();
    const bullet = document.querySelector('#bullet');
    bullet.style.transition = 'all 0.1s ease';
    bullet.style.left = `${x + 5}px`;
    bullet.style.top = `${y + 10}px`;
    bullet.style.display = 'block';
    setTimeout(() => {
        bullet.style.left = '50vw';
        bullet.style.top = '110vh';
    }, 100);
}

const reactToShoot = (actualWord, splittedActualWord) => {
    actualWord.push(splittedActualWord.shift());
    document.querySelector(`#${writtingWord}`).children[actualWord.length - 1].style.color = 'orange';
}

const updateScore = () => {
    score = completedWords.length;
    scoreDomNode.innerText = `${score}/${scoreToWin}`;
}

const checkIfUserWins = () => {
    return score === scoreToWin;
}

const handleCompletedWord = () => {
    wordContainerElement.removeChild(document.querySelector(`#${writtingWord}`));
    completedWords.push(writtingWord);
    wordList = wordList.filter(word => word !== writtingWord);
    actualWord = [];
    writtingWord = '';
}

//listen to keyboard input key event 
const detectKeyTyping = () => {
    document.addEventListener('keydown', function (event) {
        let letter = event.key.toLowerCase();
        const mapItem = wordList.find(word => word && word[0] === letter);

        if (mapItem && !writtingWord) {
            const { top } = document.querySelector(`#${mapItem}`)?.getBoundingClientRect();
            if (top && top > 0) {
                writtingWord = mapItem;
                splittedActualWord = mapItem.split('');
                shoot(writtingWord);
                reactToShoot(actualWord, splittedActualWord, writtingWord);
            }
        }

        if (writtingWord.length > 0 && letter === splittedActualWord[0]) {
            shoot(writtingWord);
            reactToShoot(actualWord, splittedActualWord, writtingWord);
        }

        if (actualWord.length > 0 && actualWord.join('') === writtingWord) {
            handleCompletedWord();
            updateScore();
        }
        checkIfUserWins() ? showWinnerMessage() : wordList.length === 0 && showWordsInDom();
    });
}

const emptyCompletedWords = () => {
    completedWords = [];
}

const initGame = () => {
    emptyCompletedWords();
    initializeWordArray();
    showWordsInDom();
    detectKeyTyping();
    checkIfUserLoses();
    updateScore();
}

// First call
initGame();
registerRestartEvent();