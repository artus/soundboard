const { ipcRenderer } = require("electron");
const { dialog } = require("electron").remote;
const fs = require("fs");
const dataurl = require("dataurl");

const buttonContainer = document.querySelector("#button-container");
const leftMouseButton = 0;
const rightMouseButton = 2;

const extensions = [
    "wav"
]

let buttonCount = 0;
let buttons = {};

ipcRenderer.on("buttonCount", (event, message) => {
    buttonCount = parseInt(message);
    generateButtons();
});

function generateButtons() {

    let newButtons = {};

    for (let i = 0; i < buttonCount; i++) {
        newButtons[`button-${i}`] = undefined;
    }

    buttons = newButtons;
    renderButtons();
}

function renderButtons() {

    buttonContainer.innerHTML = "";

    for (let button in buttons) {
        let newButton = document.createElement("div");
        newButton.setAttribute("id", button);
        newButton.setAttribute("class", "button");

        newButton.addEventListener("mousedown", (e) => {
            if (e.button == leftMouseButton) playAudio(button);
            else if (e.button == rightMouseButton) chooseAudio(button);
        });

        buttonContainer.appendChild(newButton);
    }
}

function playAudio(button) {
    console.log(`Playing audio for ${button}`);
    if (typeof buttons[button] != "undefined") {
        let audioPlayer = new Audio();
        audioPlayer.src = buttons[button];
        audioPlayer.play()
    }
}

function chooseAudio(button) {
    let filename = dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{ name: "Wav files", extensions }]
    });

    if (typeof filename != "undefined") {
        let dataUrl = loadAsDataUrl(filename[0], "audio/wav");
        buttons[button] = dataUrl;
        markButtonActive(button);
    } else {
        buttons[button] = undefined;
        markButtonInactive(button);
    }
}

function markButtonActive(button) {
    document.querySelector(`#${button}`).setAttribute("class", "button active");
}

function markButtonInactive(button) {
    document.querySelector(`#${button}`).setAttribute("class", "button");
}

function loadAsDataUrl(filename, mimetype) {
    console.log(filename);
    return dataurl.convert({ data: fs.readFileSync(filename), mimetype });
}
