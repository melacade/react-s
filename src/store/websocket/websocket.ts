import {connect, Socket} from "socket.io-client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import exp from "constants";

export class WebSocket {
    private io: Socket;
    private connected: boolean;
    reconnectId: any | null;

    constructor(url: string) {
        this.connected = false;
        let s = url.trim().substring(0, 5);
        this.io = connect(s === "ws://" ? url : "ws://" + url);
        this.reConnect();
        this.on({
            event: "connect",
            callback: () => {
                this.connected = true;
                console.log("Socket 连接成功!");
            }
        });
        this.on({
            event: "close",
            callback: (data) => {
                this.connected = false;
                console.log("Socket 连接失败", data);
            }
        });
        this.on({
            event: "error",
            callback: (data) => {
                console.error("Socket 连接异常", data);
            }
        });
    }

    on(event: RegistrationEvent) {
        this.io.on(event.event, (data) => {
            console.log("socket:", data);
            event.callback(data);
        });
    }

    message(msg: CommMessage) {
        this.io.emit(msg.event, msg.data);
    }

    isConnected() {
        return this.connected;
    }

    reConnect() {
        this.io.connect();
    }

    close() {
        this.io.close();
        this.connected = false;
    }
}

export interface RegistrationEvent {
    event: string;
    callback: (data: any) => void;
}

export interface CommMessage {
    event: string;
    data: any;
}

// @ts-ignore
const initialState: WebSocket = new WebSocket(window.testReact.websocketUrl);

export const socketSlice = createSlice({
    name: "ws",
    initialState,
    reducers: {
        init: (state) => {
            state.reconnectId = setInterval(() => {
                if (!state.isConnected()) {
                    state.reConnect();
                }
            }, 10000);
        },
        on: (state, action: PayloadAction<RegistrationEvent>) => {
            state.on(action.payload);
        },
        close: (state) => {
            if (state.isConnected() && state.reconnectId) {
                clearInterval(state.reconnectId);
                state.reconnectId = null;
            }
        },
        emit: (state, action: PayloadAction<CommMessage>) => {
            state.message(action.payload);
        },
    }
});

export const {init,on,close,emit} = socketSlice.actions;

export default socketSlice.reducer;
