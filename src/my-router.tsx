import {BrowserRouter, Route, Routes} from 'react-router-dom'
import App from "./App";
import {StatePageOne} from "./pages/StatePageOne";
import ThreeD from "./pages/ThreeD";

function MyRouter() {

    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/test" element={<StatePageOne/>}/>
            <Route path="/3d" element={<ThreeD/>}/>
        </Routes>
    </BrowserRouter>;
}

export default MyRouter;
