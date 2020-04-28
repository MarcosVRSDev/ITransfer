const { app, BrowserWindow, Menu, shell } = require("electron");

let win;
 
function createWindow() {
  // Cria uma janela de navegação.
   win = new BrowserWindow({
    width: 600,
    height: 680,
    minWidth: 600,
    minHeight: 680,
    maxHeight: 600,
    maxWidth: 680,
    icon: __dirname + "\\utils\\logo.svg",
    webPreferences: {
      nodeIntegration: true
    }
  });


  // and load the index.html of the app.
  win.loadFile("index.html");

  // Open the DevTools.
  //win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(function () {
  createWindow();

  const template = [
    {
      label: 'Developers Menu',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
      ]
    },
    {
      label: 'Ajuda',
      submenu: [{ 
          label: 'Fale Conosco',
          click: function() {
          shell.openExternal('https://inovamobil.com.br/atendimento-online/');
        }
      }]
    },
    {
      label: 'Sobre',
      submenu: [{ 
          label: 'Sobre a empresa',
          click: function() {
          shell.openExternal('https://inovamobil.com.br/empresa/');
        }
      }]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});

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