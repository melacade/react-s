import {Action, configureStore, Middleware} from '@reduxjs/toolkit'
import CounterSlice from "./counter/counterSlice";
import WebsocketSlice from "./websocket/websocket";
// @ts-ignore
import logger from "redux-logger";
export const store = configureStore(
    {
        reducer: {
            counter: CounterSlice,
            socket: WebsocketSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(logger),
    }
);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
