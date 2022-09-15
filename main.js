// @ts-ignore
const path = require('path');
const url = require('url');
const {app, BrowserWindow,session} = require( 'electron');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width:800,height:600});
    // @ts-ignore
    // mainWindow.loadURL("http://localhost:3000").then((res)=>{
    //     console.log(res);
    // });

    // var protocol = electron.protocol;
    // protocol.registerFileProtocol('atom', function(request, callback) {
    //     var url = request.url.substr(7);
    //     callback({path: path.normalize(__dirname + '/' + url)});
    // }, function (error) {
    //     if (error)
    //         console.error('Failed to register protocol')
    // });

    const fileter = {urls: ['file:///*/models/*.gz']};
    session.defaultSession.webRequest.onHeadersReceived(fileter, (details,callback) => {
        details.responseHeaders["Content-Encoding"] = ["gzip"];
        details.responseHeaders["Content-Type"] = ["application/gzip"];
        details.responseHeaders["content-type"] = ["application/gzip"];
        // delete details.responseHeaders['Content-Type'];
        details.responseHeaders["access-control-allow-methods"] = ["*"];
        details.responseHeaders["access-control-allow-origin"] = ["*"];
        details.responseHeaders["accept-ranges"] = ["bytes"];
        details.responseHeaders["access-control-allow-headers"] = ["*"];
        details.responseHeaders["cache-control"] = ["public", "max-age=0"];
        details.responseHeaders["connection"] = ["close"];
        callback({
            responseHeaders: details.responseHeaders,
            statusLine:"1"
        })
        console.log(details);
    });
    // const fileter2 =  {urls: ['file:///*/models/*']};
    // session.defaultSession.webRequest.onHeadersReceived(fileter2, (details,callback) => {
    //     callback()
    // });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file',
        slashes: true
    }))
    // @ts-ignore
    mainWindow.setThumbarButtons([])
    // @ts-ignore
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


