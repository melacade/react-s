const {createProxyMiddleware: proxy} = require('http-proxy-middleware');

module.exports = app => {
    // let prox = proxy({
    //
    //     target: "127.0.0.1:3000",
    //     pathRewrite:{
    //         "^/models":""
    //     },
    //     changeOrigin: false,
    //     onError: err => {
    //         console.log(err);
    //     },
    //
    // });
    // prox.on('proxyRes', function (proxyRes, req, res) {
    //
    //     proxyRes.on('end', function () {
    //         res.setHeader("Content-Encoding","gzip");
    //         res.end("my response to cli");
    //     });
    // });
    app.use( proxy("/models/**/*.gz",{
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            "^/models":"/"
        },
        onProxyRes: (proxyRes, req, res) => {
            res.setHeader("Content-Encoding", "gzip");
        },

    }))


}
