import { getRandomValue, getRandomWordArray, removeAllChildNodes } from './utils.js';
import { getWordsArrayBySettingsOrPlatform } from './data.js';

let wordSetList = [];
let writtingWordProgressArray = [];
let splittedCurrentlyWrittingWord = [];
let currentlyWrittingWord = '';
let completedWords = [];
let wordList = [];
let score = 0;
let scoreToWin = 100;
const defaultLevelArrayLength = 10;
const defaultFallDuration = 33;
const horizontalMaxPosition = 80;
const horizontalMinPosition = 10;
const fallDelaySeconds = 1.5;
const fallDurationSeconds = 3;
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
    wordSetList = Array.from(new Set(structuredClone(getWordsArrayBySettingsOrPlatform())));
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
    wordList = getRandomWordArray(wordSetList, defaultLevelArrayLength);
    wordList.forEach((word) => {
        const domNodeWithWord = buildWordDomNode(word);
        wordContainerElement.appendChild(domNodeWithWord);
    });
};

const buildWordDomNode = (word) => {
    const wordElement = document.createElement('div');
    const wordElementCount = document.querySelectorAll('.word-div').length;
    const horizontalPosition = `${getRandomValue(horizontalMaxPosition, horizontalMinPosition)}%`;
    const fallDelay = `${wordElementCount * fallDelaySeconds}s`;
    const fallDuration = `${defaultFallDuration - ((score / defaultLevelArrayLength) * fallDurationSeconds)}s`;
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
    const { x, y } = document.querySelector(`#${currentlyWrittingWord}`).getBoundingClientRect();
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

const reactToShoot = (writtingWordProgressArray, splittedCurrentlyWrittingWord) => {
    writtingWordProgressArray.push(splittedCurrentlyWrittingWord.shift());
    document.querySelector(`#${currentlyWrittingWord}`).children[writtingWordProgressArray.length - 1].style.color = 'orange';
}

const updateScore = () => {
    score = completedWords.length;
    scoreDomNode.innerText = `${score}/${scoreToWin}`;
}

const checkIfUserWins = () => {
    return score === scoreToWin;
}

const handleCompletedWord = () => {
    wordContainerElement.removeChild(document.querySelector(`#${currentlyWrittingWord}`));
    completedWords.push(currentlyWrittingWord);
    wordList = wordList.filter(word => word !== currentlyWrittingWord);
    writtingWordProgressArray = [];
    currentlyWrittingWord = '';
}

//listen to keyboard input key event 
const detectKeyTyping = () => {
    document.addEventListener('keydown', function (event) {
        let typedLetter = event.key.toLowerCase();
        const foundWord = wordList.find(word => word && word[0] === typedLetter);

        if (foundWord && !currentlyWrittingWord) {
            const { top } = document.querySelector(`#${foundWord}`)?.getBoundingClientRect();
            if (top && top > 0) {
                currentlyWrittingWord = foundWord;
                splittedCurrentlyWrittingWord = foundWord.split('');
                shoot();
                reactToShoot(writtingWordProgressArray, splittedCurrentlyWrittingWord);
            }
        }

        if (currentlyWrittingWord.length > 0 && typedLetter === splittedCurrentlyWrittingWord[0]) {
            shoot();
            reactToShoot(writtingWordProgressArray, splittedCurrentlyWrittingWord);
        }

        if (writtingWordProgressArray.length > 0 && writtingWordProgressArray.join('') === currentlyWrittingWord) {
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