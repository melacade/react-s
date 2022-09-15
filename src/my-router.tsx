import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from "./App";
import {StatePageOne} from "./pages/StatePageOne";

function MyRouter() {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/test" element={<StatePageOne/>}/>
        </Routes>
    </BrowserRouter>;
}

export default MyRouter;
