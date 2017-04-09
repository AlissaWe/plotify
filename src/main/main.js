import electron from "electron";
import url from "url";

require("./model/index");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {

  let path = require("path");

  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: path.join(__dirname, "./ui/resources/app-icons/64.png"),
    show: false,
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.maximize();
    mainWindow.openDevTools();
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "./ui/index.html"),
    protocol: "file:",
    slashes: true
  }));

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
