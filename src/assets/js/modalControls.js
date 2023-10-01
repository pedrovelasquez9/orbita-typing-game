const instructionsDomBtn = document.querySelector("#instructions-btn");
const instructionsModalElement = document.querySelector("#instructions-modal");
const closeInstructionsModalBtn = document.querySelector("#close-instructions-modal-btn");

instructionsDomBtn.addEventListener("click", (elem) => {
    instructionsModalElement.showModal();
});

closeInstructionsModalBtn.addEventListener("click", (elem) => {
    instructionsModalElement.close();
})