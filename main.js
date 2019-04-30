const { app, BrowserWindow } = require("electron");

const buttonCount = 20;

function createWindow() {
    let mainWindow = new BrowserWindow({ width: 800, height: 600});
    mainWindow.setMenu(null);
    mainWindow.loadFile("./board.html");
}

app.on("ready", createWindow);
app.on("window-all-closed", () => app.quit());