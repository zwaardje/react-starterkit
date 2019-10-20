var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxyServer({
    target: 'https://preprod.taxielectric.nl',
    changeOrigin: true
})
proxy.listen(8000);

proxy.on('proxyRes', function (proxyRes, req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:1337")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me")

    if (req.method === 'OPTIONS') {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": "http://localhost:1337",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "POST, GET, PUT, PATCH, OPTIONS, DELETE",
            "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me"
        })
    }
});