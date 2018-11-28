const _ = require('lodash')
const boom = require('boom')
const joi = require('joi')
const joiSchemas = require('../../domain/joi')

const sessions = {
    1: {
        id: 1,
        name: 'Session 1',
        date: '2018-11-28T11:00:00-04:00'
    },
    2: {
        id: 2,
        name: 'Session 2',
        date: '2018-11-28T12:00:00-04:00'
    }
}

const registrations = []

const getAll = () => {
    return _.values(sessions)
}

const getOne = (id) => {
    return sessions[id]
}

module.exports = [
    {
        method: 'GET',
        options: {
            tags: ['api'],
            description: 'Gets all sessions',
            response: {
                options: {
                    abortEarly: false
                },
                sample: 100,
                schema: joi.array().items(joiSchemas.session)
            }
        },
        path: '/session',
        handler: (request, h) => { return getAll() }
    },
    {
        method: 'GET',
        options: {
            tags: ['api'],
            description: 'Gets a single session',
            response: {
                options: {
                    abortEarly: false
                },
                sample: 100,
                schema: joiSchemas.session
            },
            validate: {
                params: {
                    id: joi.number().integer().min(1)
                }
            }
        },
        path: '/session/{id}',
        handler: (request, h) => {
            const session = getOne(request.params.id)
            if (!session) {
                throw boom.notFound(`Session ${request.params.id} not found`)
            }
            return session
        }
    },
    {
        method: 'POST',
        options: {
            tags: ['api'],
            description: 'Subscribes a user to a session for a treatment',
            validate: {
                params: {
                    id: joi.number().integer().min(1)
                },
                payload: joiSchemas.registration
            }
        },
        path: '/session/{id}/subscribe',
        handler: (request, h) => {
            const session = getOne(request.params.id)
            if (!session) {
                throw boom.notFound(`Unable to register for session ${request.params.id} as it doesn't exist.`)
            }
            if (!_.isArray(registrations[request.params.id])) {
                registrations[request.params.id] = []
            }
            registrations[request.params.id].push(request.payload)
            return h.response('Reservation created').code(201)
        }
    },
    {
        method: 'GET',
        options: {
            tags: ['api'],
            description: 'Gets all subscriptions for a session',
            validate: {
                params: {
                    id: joi.number().integer().min(1)
                }
            },
            response: {
                options: {
                    abortEarly: false
                },
                sample: 100,
                schema: joi.array().items(joiSchemas.registration)
            }
        },
        path: '/session/{id}/subscriptions',
        handler: (request, h) => {
            const session = getOne(request.params.id)
            if (!session) {
                return boom.notFound(`Unable to register for session ${request.params.id} as it doesn't exist.`)
            }
            if (!_.isArray(registrations[request.params.id])) {
                registrations[request.params.id] = []
            }
            return registrations[request.params.id]
        }
    }
]
