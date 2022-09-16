import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks";
import {decrement, increment} from "./store/counter/counterSlice";
import {Button} from "antd";
import {Link} from "react-router-dom";


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
            <Button><Link to="/test"> 第三方组件使用 </Link></Button>
            <Button><Link to="/3d">3D测试</Link></Button>
        </div>
    );
}

export default App;
