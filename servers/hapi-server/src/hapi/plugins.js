const config = require('config')
const inert = require('inert')
const vision = require('vision')
const blipp = require('blipp')
const autoRoute = require('hapi-auto-route')
const swaggered = require('hapi-swaggered')
const swaggeredUI = require('hapi-swaggered-ui')
const good = require('good')
const poop = require('poop')
// const heavy = require('heavy')
// const nes = require('nes')

// const statusMonitor = require('hapijs-status-monitor')
// const hapiEnding = require('hapi-ending')

const hapiPlugins = []

// hapiPlugins.push({
//     plugin: nes,
//     options: {
//         auth: false,
//         headers: '*',
//         heartbeat: {
//             interval: 10000,
//             timeout: 9000
//         },
//         onConnection: websocket.onConnection,
//         onDisconnection: websocket.onDisconnection,
//         onMessage: websocket.onMessage
//     }
// })
hapiPlugins.push({
    plugin: good,
    options: config.get('hapi.good')
})
hapiPlugins.push({
    plugin: autoRoute,
    options: {
        routes_dir: './src/routes',
        use_prefix: true
    }
})
hapiPlugins.push(inert)
hapiPlugins.push(vision)
hapiPlugins.push(blipp)
hapiPlugins.push({
    plugin: swaggered,
    options: {
        info: {
            title: 'SPA Day API',
            description: 'Chariot 2018 SPA Day backend server',
            version: '1.0'
        }
    }
})
hapiPlugins.push({
    plugin: swaggeredUI,
    options: {
        title: 'SPA Day API',
        path: '/docs',
        authorization: false,
        swaggerOptions: {}
    }
})
hapiPlugins.push({
    plugin: poop,
    options: {
        logPath: './logs/poop.log',
        heapdumpFolder: './logs'
    }
})

module.exports = hapiPlugins
