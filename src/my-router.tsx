import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from "./App";

function MyRouter() {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
        </Routes>
    </BrowserRouter>;
}

export default MyRouter;
