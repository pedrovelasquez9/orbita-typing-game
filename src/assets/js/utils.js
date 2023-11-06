const DEFAULT_SETTINGS = {
    "enable-accents": "on"
}

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

export const saveSettingsInLocalStorage = (settingsFormDataObject) => {
    localStorage.setItem('orbitaSettings', JSON.stringify(settingsFormDataObject));
}

export const getSettingsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('orbitaSettings'));
}

export const initializeSettings = (settingsForm) => {
    const savedSettings = getSettingsFromLocalStorage();
    if (!savedSettings) {
        saveSettingsInLocalStorage(DEFAULT_SETTINGS);
        applySettingsToForm(settingsForm, DEFAULT_SETTINGS);
    };
    applySettingsToForm(settingsForm, savedSettings);
};

export const applySettingsToForm = (settingsForm, settings) => {
    Object.keys(settings).forEach(key => {
        if (settingsForm[key].type === 'checkbox' && settings[key] === 'on') {
            settingsForm[key].checked = true;
        }
        settingsForm[key].value = settings[key];
    });
};