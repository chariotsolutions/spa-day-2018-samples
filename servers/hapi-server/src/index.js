const config = require('config')
const log4js = require('log4js')
// const epimetheus = require('epimetheus')
const _ = require('lodash')
const serverFactory = require('./hapi')

if (config.get('debugTrace')) {
    require('clarify')
    require('trace')
}
// Clamps the depth of the trace. See the `trace` docs.
Error.stackTraceLimit = 100

log4js.configure(config.get('log4js'))
const log = log4js.getLogger()

const bugs = 'off' // eslint-disable-line no-unused-vars

module.exports = (async () => {
    let server

    log.info('I am starting up')
    log.info('Installing signal handlers')
    /*
     * Signal handlers.
     */

    const gracefulShutdown = async () => {
        log.info('Server shutdown')
        log4js.shutdown()

        if (!server) {
            process.exit(0) // eslint-disable-line no-process-exit
        }
        await server.stop({ timeout: 5000 })
        process.exit(0) // eslint-disable-line no-process-exit
    }

    /* This fixes a bug with node-dev where the process hangs in the background,
     * zombie-like, and needs a SIGKILL to remove. Something is stuck that
     * prevents a graceful exit. Since we're exiting anyway, I don't
     * particularly care to spend time to find it.
     */
    process.on('SIGTERM', gracefulShutdown)

    /*
     * Graceful stop in PM2.
     * http://pm2.keymetrics.io/docs/usage/signals-clean-restart/
     */
    process.on('SIGINT', gracefulShutdown)

    process.on('unhandledRejection', (err) => {
        log.error('Unhandled promise rejection failure', err)
        process.exit(1) // eslint-disable-line no-process-exit
    })

    // Output what we're actually loading for configs.
    _.forEach(config.util.getConfigSources(), (source) => {
        log.info(`Loaded config ${source.name}`)
    })

    server = await serverFactory.getServer()

    return server
})()
