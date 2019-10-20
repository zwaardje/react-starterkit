var httpProxy = require('http-proxy')
var express = require('express')
var fs = require('fs')

const app = express()
const appTest = express()

app.use(express.static(__dirname + '/static', { dofiles: 'allow' }))
appTest.use(express.static(__dirname + '/static', { dofiles: 'allow' }))

app.listen(8080, () => {
    console.log('started listening');
})

appTest.listen(2080,() => {
    console.log('started listening for test');
})

function createCORSProxy(sourceAddress, targetAddress, keyName) {
    var proxy = httpProxy.createProxyServer({
        ssl: {
            key: fs.readFileSync('/etc/letsencrypt/live/'+keyName+'/privkey.pem', 'utf8'),
            cert: fs.readFileSync('/etc/letsencrypt/live/'+keyName+'/cert.pem', 'utf8'),
            ca: fs.readFileSync('/etc/letsencrypt/live/'+keyName+'/chain.pem', 'utf8')
        },
        target: targetAddress,
        changeOrigin: true
    }
    )

    proxy.on('proxyRes', function (proxyRes, req, res) {
        res.setHeader("Access-Control-Allow-Origin", sourceAddress)
        res.setHeader("Access-Control-Allow-Credentials", "true")
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS, DELETE")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me")

        if (req.method === 'OPTIONS') {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": sourceAddress,
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "POST, GET, PUT, PATCH, OPTIONS, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With, remember-me"
            })
        }
    });

    return proxy;
}

const proxy = createCORSProxy('https://portal.taxielectric.nl', 'https://book.taxielectric.nl', 'api.portal.taxielectric.nl');
const proxyTest = createCORSProxy('https://portal-test.taxielectric.nl', 'https://preprod.taxielectric.nl', 'api.portal-test.taxielectric.nl');

proxyTest.listen(2443);
proxy.listen(1443);

