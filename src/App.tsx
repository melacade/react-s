import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks";
import {decrement, increment} from "./store/counter/counterSlice";
import {Button} from "antd";


function App() {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()
    const click = ()=> dispatch(increment())
    const de = () => dispatch(decrement());

    return (
        <div className="App">
            <div>{count}</div>
            <Button onClick={click}>加</Button>
            <Button type={"primary"} onClick={de}>减</Button>
            <Button><a href="/test"> 第三方组件使用 </a></Button>
            <Button><a href="/3d">3D测试</a></Button>
        </div>
    );
}

export default App;
