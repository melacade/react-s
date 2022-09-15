const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require( 'electron');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width:800,height:600});
    mainWindow.loadURL("http://localhost:3000").then((res)=>{
        console.log(res);
    });
    mainWindow.setThumbarButtons([])
    mainWindow.on(
        'closed',
        function () {
            mainWindow = null;
        }
    )
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});


app.on('activate', function () {
    if (mainWindow == null) {
        createWindow();
    }
});


