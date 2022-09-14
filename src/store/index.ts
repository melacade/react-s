import {Action, configureStore, Middleware} from '@reduxjs/toolkit'
import CounterSlice from "./counter/counterSlice";
import logger from 'redux-logger'

const store = configureStore(
    {
        reducer: {
            counter: CounterSlice
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .prepend(
                    // correctly typed middlewares can just be used
                    additionalMiddleware,
                )
                // prepend and concat calls can be chained
                .concat(logger),
    }
);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
