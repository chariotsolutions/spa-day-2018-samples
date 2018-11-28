const hapi = require('hapi')
const config = require('config')
const log = require('log4js').getLogger()

let server = false

const getServer = () => {
    if (server) {
        return server
    }
    log.info('Instantiating hapi')

    // We have to convert the config object to a pojo since hapi does strict
    // validation on the configuration, and lowernwest `config` objects can be
    // rich.
    const hapiConfig = config.util.toObject(config.get('hapi.server'))
    server = new hapi.Server(hapiConfig)

    return server
}

module.exports = {
    getServer
}
