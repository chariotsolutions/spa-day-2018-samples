const moment = require('moment')

const eventHandler = (type, request, event, tags) => {
    let consoleLog = `${moment().toISOString()} ${type}: `
    const json = {
        type,
        time: moment().toISOString()
    }
    if (request) {
        json.id = request.id
        json.referrer = request.info.referrer
        json.remoteAddress = request.info.remoteAddress
        json.method = request.method
        json.path = request.path

        consoleLog = `${consoleLog} ${request.method} ${request.path} ${request.info.remoteAddress}`
    }
    if (event) {
        console.log(event)
    }

    console.log(consoleLog)
    // TODO: dispatch JSON log to ELK
}

const registerConsole = (server) => {
    server.events.on('log', (event, tags) => eventHandler('log', undefined, event, tags))
    server.events.on('request', (request, event, tags) => eventHandler('request', request, event, tags))
    server.events.on('response', (request) => eventHandler('response', request, undefined, undefined))
}

module.exports = {
    register: registerConsole
}
