export const getRandomValue = (max, min = 1) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getRandomWordArray = (wordArray, desiredLength) => {
    //gets random unique words from the array 
    const words = [];
    if (wordArray.length < desiredLength) {
        return words;
    }

    for (let i = 0; i < desiredLength; i++) {
        const randomIndex = getRandomValue(wordArray.length);
        words.push(wordArray[randomIndex]);
        wordArray.splice(randomIndex, 1);
    }

    return words;
}

export const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}