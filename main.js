const { app, BrowserWindow, ipcMain } = require("electron");


let win;
 
function createWindow() {
  // Cria uma janela de navegação.
   win = new BrowserWindow({
    width: 600,
    height: 550,
    minWidth: 600,
    minHeight: 550,
    maxHeight: 600,
    maxWidth: 550,
    webPreferences: {
      nodeIntegration: true
    }
  });


  // and load the index.html of the app.
  win.loadFile("index.html");

  // Open the DevTools.
  //win.webContents.openDevTools();
}

ipcMain.on('openFile', (event, arg) => {
  const { dialog } = require('electron');
  const fs = require('fs');

  ipcMain.on('click-button', (event, arg)=> {
    if (arg === true) {
      dialog.showOpenDialog(function (fileNames) {
        if(fileNames === undefined) {
          console.log("Nenhum arquivo selecionado")
        } else {
          console.log("Arquivo foi selecionado");
        }
      });
    }
  });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // No macOS é comum para aplicativos e sua barra de menu
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});