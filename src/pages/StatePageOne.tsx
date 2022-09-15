import {CSSProperties, useEffect} from "react";

export function StatePageOne() {

    const style: CSSProperties = {
        margin: 0,
        padding: 0,
        position: "absolute",
        width: window.innerWidth, height: window.innerHeight, left: 0, top: 0
    };
    useEffect(()=>{
        var options = {
            container: 'luckysheet' //luckysheet为容器id
        }

        // @ts-ignore
        window.luckysheet.create(options)
    })
    return (
        <div>
            <div id="luckysheet" style={style}></div>
        </div>
    );
}
