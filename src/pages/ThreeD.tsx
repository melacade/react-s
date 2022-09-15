import {CSSProperties} from "react";

export default function ThreeD() {
    let viewer: { addModel: (arg0: any) => void; resize: (arg0: number, arg1: number) => void; };
    // @ts-ignore
    let loaderConfig = new BimfaceSDKLoaderConfig();
    // @ts-ignore
    loaderConfig.dataEnvType = BimfaceEnvOption.Local;
    loaderConfig.sdkPath = './jssdk';
    loaderConfig.path = './models/viewToken.json';
    let onSDKLoadSucceeded = (viewMetaData:any)=>{
        debugger;
        let view = document.getElementById('3dView')
        // @ts-ignore
        let config = new Glodon.Bimface.Application.WebApplication3DConfig();
        config.domElement = view;
        // @ts-ignore
        let eventManager = Glodon.Bimface.Application.WebApplication3DEvent;
        // @ts-ignore
        let app = new Glodon.Bimface.Application.WebApplication3D(config);
        if (!viewer) {
            viewer = app.getViewer();

            window.onresize = ()=> {
                viewer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight - 40)
            }
            viewer.addModel(viewMetaData);
        }


    };
    let onSDKLoadFailed=(error: any)=>{
        console.log("Failed to load SDK!",error);
    };
    // @ts-ignore
    BimfaceSDKLoader.load(loaderConfig,onSDKLoadSucceeded,onSDKLoadFailed);
    const style : CSSProperties ={
        width: window.innerWidth,
        height: window.innerHeight,

    }
    return(
        <div>
            <div id="3dView" style={style}></div>
        </div>
    )
}

