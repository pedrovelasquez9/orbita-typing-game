import { saveSettingsInLocalStorage, initializeSettings } from './utils.js';
// Instructions controls
const instructionsDomBtn = document.querySelector("#instructions-btn");
const instructionsModalElement = document.querySelector("#instructions-modal");
const closeInstructionsModalBtn = document.querySelector("#close-instructions-modal-btn");
// Settings controls
const settingsDomBtn = document.querySelector('#open-settings-btn');
const settingsModalElement = document.querySelector('#settings-modal')
const settingsForm = document.querySelector('#settings-form');
const closeSettingsModalBtn = document.querySelector('#close-settings-modal-btn');

instructionsDomBtn.addEventListener("click", (elem) => {
    instructionsModalElement.showModal();
});

closeInstructionsModalBtn.addEventListener("click", (elem) => {
    instructionsModalElement.close();
});

settingsDomBtn.addEventListener('click', () => {
    settingsModalElement.showModal();
});

closeSettingsModalBtn.addEventListener('click', () => {
    const settingsFormDataObject = Object.fromEntries(new FormData(settingsForm));
    saveSettingsInLocalStorage(settingsFormDataObject);
    settingsModalElement.close();
});

// GET TO A SETTINGS FILE WITH SETTINGS UTILS
initializeSettings(settingsForm);
