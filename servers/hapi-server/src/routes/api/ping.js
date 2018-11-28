module.exports = {
    method: 'GET',
    path: '/ping',
    options: {
        tags: ['api'],
        description: "says 'pong'"
    },
    handler: () => 'pong'
}
