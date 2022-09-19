import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export class WebSocketMelody {
    private io: WebSocket | null | undefined;
    private callBackDictionary: Map<String, Function>;
    private readonly url: string;
    private reConnectingID: any;
    constructor(url: string) {
        let s = url.trim().substring(0, 5);
        this.url = "ws://" === s ? url : "ws://" + url;
        this.callBackDictionary = new Map<String, Function>();
    }

    on(event: RegistrationEvent) {
        this.callBackDictionary.set(event.event, event.callback);
    }

    dropEvent(event: string) {
        this.callBackDictionary.delete(event);
    }

    init() {
        if (!this.isConnected()) {
            this.io = new WebSocket(this.url);
            if (this.io.readyState === WebSocket.CONNECTING) {
                this.io.onclose = this.release;
                this.io.onerror = this.onError;
                this.io.onmessage = this.handelMessage;
                this.io.onopen = this.handelMessage;
            }
            if (!this.reConnectingID) {
                this.reConnect();
            }
        }
    }

    sendMessage(msg: CommMessage) {
        this.io?.send(JSON.stringify(msg));
    }

    handelMessage(msg: Event) {
        console.log(msg);
    }

    isConnected() {
        return this.io && this.io?.readyState === WebSocket.OPEN;
    }

    reConnect() {
       this.reConnectingID = setInterval(() => {
            if (!this.isConnected()) {
                this.init();
            } else {
                this.io?.send("heart beat");
            }
        }, 10000);
    }

    onError(data:Event) {
        console.error(data);
    }

    release(data: CloseEvent) {
        console.log("Socket 释放", data.reason);
    }

    close() {
        console.log("主动关闭");
        clearInterval(this.reConnectingID);
        this.reConnectingID = null;
        this.callBackDictionary.clear();
        this.io?.close(0, "主动关闭");
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

export interface MyWebSocket {
    io: WebSocketMelody | null;
    url: string;
    reNum: number;
}


