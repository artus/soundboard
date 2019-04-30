const { ipcRenderer } = require("electron");

const buttonContainer = document.querySelector("#button-container");

ipcRenderer.on("buttonCount", (event, message) => {
    buttonCount = parseInt(message);
    renderButtons();
});

function renderButtons() {

    let renderedHtml = "";

    for (let i = 0; i < buttonCount; i++) {
        renderedHtml += `<div id="button-${i+1}" class="button"></div>\n`;
    }

    buttonContainer.innerHTML = renderedHtml;
}

let buttonCount = 0;