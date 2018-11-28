// const raw = require('config/raw').raw

const debugTrace = true
// Rather annoyingly, order of appender declaration matters
// https://github.com/log4js-node/log4js-node/issues/746
const log4js = {
    appenders: {
        out: {
            type: 'console'
        },
        nodelogfile: {
            type: 'file',
            filename: 'logs/node.log',
            backups: 5,
            maxLogSize: 1048576, // bytes
            keepFileExt: true
        },
        'info-log': {
            type: 'logLevelFilter',
            appender: 'nodelogfile',
            level: 'info'
        }
    },
    categories: {
        default: {
            appenders: ['info-log', 'out'],
            level: 'debug'
        }
    }
}

/**
 * Mount location for all api calls
 */
const uriPrefix = '/api'

const hapiServer = {
    address: '0.0.0.0',
    port: 8000
    // debug: {
    //     request: ['*'],
    //     log: ['*']
    // }
}

const hapiGood = {
    ops: {
        interval: 1000000
    },
    reporters: {
        console: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    log: '*',
                    ops: '*',
                    request: '*',
                    error: '*',
                    response: '*'
                }]
            },
            { module: 'good-console' },
            'stdout'
        ]
    }
}

const socketIO = {
    path: '/api/chat',
    serveClient: true,
    origins: '*',
    cookie: false,
    pingTimeout: 10000,
    pingInterval: 30000
    // transports: ['websocket']
}

module.exports = {
    debugTrace,
    hapi: {
        server: hapiServer,
        good: hapiGood
    },
    socketIO,
    log4js,
    uriPrefix
}
