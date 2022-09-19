const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;


const ws = new WebSocketServer({
    port: 7070
});

ws.on(
    'connection',function (ws) {
        console.log("有连接");
        ws.on("message", (data,isBinary) => {
            console.log(data);
            console.log(isBinary);
        });
        ws.send("欢迎连接",err => {
            if (err) {
                console.log(err);
            }
        });
    }
);
