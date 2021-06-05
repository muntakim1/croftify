const { ipcMain,app, BrowserWindow,Menu } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    resizable: false,
    icon: __dirname + "/assets/logo.png",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      nativeWindowOpen: true,
      enableRemoteModule: true,
      sandbox: false,
      nodeIntegrationInSubFrames: true, //for subContent nodeIntegration Enable
      webviewTag: true, //for webView
    },
  });

   win.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const isMac = process.platform === "darwin";

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: "about" },
            { type: "separator" },
            { role: "services" },
            { type: "separator" },
            { role: "hide" },
            { role: "hideothers" },
            { role: "unhide" },
            { type: "separator" },
            { role: "quit" },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: app.name,
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      // {
      //   label: "Back",
      //   click: async () => {
      //            ipcMain.on("synchronous-message", function (event, arg) {
      //              console.log(arg); // prints "ping"
      //              event.returnValue = "back";
      //            });

      //   },
      // },
      // {
      //   label: "Forward",
      //   click: async () => {
      //               ipcMain.on("synchronous-message", function (event, arg) {
      //                 console.log(arg); // prints "ping"
      //                 event.returnValue = "forward";
      //               });
      //   },
      // },
    ],
  },

  // { role: 'windowMenu' }
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal(
            "https://muntakim1.github.io/munta-portfolio"
          );
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
