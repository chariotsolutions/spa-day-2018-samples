const WebSocket = require('ws')
const _ = require('lodash')
const uuidV4 = require('uuid/v4')
const debug = require('debug')('chat')

let wss
// map of ws.id -> name
const registeredUsers = {}
const history = [{
    name: 'SPA', message: 'Welcome to SPA Day!'
}]

const generateSystemMessage = (name, joined = true) => ({
    name: 'SPA', message: `${name} has ${joined ? 'joined' : 'left'} the chat.`
})

const register = (listener) => {
    if (wss) {
        return wss
    }

    wss = new WebSocket.Server({
        server: listener,
        path: '/api/chat'
    })

    wss.on('connection', (ws, req) => {
        debug('Initial connection')

        ws.id = uuidV4()

        _.forEach(history, (entry) => {
            ws.send(JSON.stringify(entry))
        })

        ws.on('close', () => {
            if (registeredUsers[ws.id]) {
                const leftMessage = generateSystemMessage(registeredUsers[ws.id], false)
                registeredUsers[ws.id] = undefined
                history.push(leftMessage)
                broadcast(leftMessage)
            }
        })

        ws.on('message', (raw) => {
            debug('received: %s', raw)

            let payload
            try {
                payload = JSON.parse(raw)
            } catch (e) {
                ws.send(JSON.stringify({ error: `invalid payload expected object but got ${raw}` }))
            }

            if (payload) {
                try {
                    if (!registeredUsers[ws.id]) {
                        if (!_.isString(payload.name)) {
                            ws.send(JSON.stringify({ error: 'Wtf is your name dude' }))
                            return
                        }
                        if (_.includes(_.values(registeredUsers), payload.name || payload.name === 'SPA')) {
                            ws.send(JSON.stringify({ error: 'Sorry chief this name is in use' }))
                            return
                        }

                        registeredUsers[ws.id] = payload.name
                        const welcomeMessage = generateSystemMessage(payload.name)
                        history.push(welcomeMessage)
                        broadcast(welcomeMessage)
                        ws.send(JSON.stringify({ name: payload.name, registered: true }))
                        return
                    }

                    if (!_.isString(payload.message)) {
                        ws.send(JSON.stringify({ error: 'Wtf are you trying to say dude' }))
                        return
                    }

                    const newMesage = { name: registeredUsers[ws.id], message: payload.message }
                    history.push(newMesage)
                    broadcast(newMesage)
                } catch (e) {
                    ws.send(JSON.stringify({ error: e.toString() }))
                }
            }
        })
    })

    return wss
}

const broadcast = (message) => {
    // eslint-disable-next-line lodash/prefer-lodash-method
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message))
        }
    })
}

module.exports = {
    register
}
