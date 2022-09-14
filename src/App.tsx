import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks";
import {decrement, increment} from "./store/counter/counterSlice";

function App() {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()
    const click = ()=> dispatch(increment())
    const de = () => dispatch(decrement());
    return (
        <div className="App">
            <div>{count}</div>
            <button onClick={click}>加</button>
            <button onClick={de}>减</button>
        </div>
    );
}

export default App;
