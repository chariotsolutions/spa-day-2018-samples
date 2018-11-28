const serverFactory = require('./server')
const plugins = require('./plugins')
const log = require('log4js').getLogger()
// const logging = require('./custom_logging')
const websocket = require('../websockets')

let server = false

const getServer = async () => {
    if (server) {
        return server
    }

    log.info('Starting up server')
    server = serverFactory.getServer()
    global.server = server

    log.info('Registering hapi plugins')
    await server.register(plugins)

    // Instrument this server at endpoint `/metrics` for Prometheus
    // log.info('Installing Prometheus instrumentation in /metrics')
    // FIXME: Waiting on PR: https://github.com/roylines/node-epimetheus/issues/43
    // epimetheus.instrument(server)

    // Configure websockets
    websocket.register(server.listener)

    await server.start()

    // logging.register(server)

    log.info(`Review endpoint docs: ${server.info.uri}/docs`)
    return server
}

module.exports = {
    getServer
}
