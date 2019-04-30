const { app, BrowserWindow, } = require("electron");

const buttonCount = 20;

function createWindow() {
    let mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });
    mainWindow.setMenu(null);
    mainWindow.loadFile("./board.html");
    mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send("buttonCount", buttonCount);
    })
}

app.on("ready", createWindow);
app.on("window-all-closed", () => app.quit());