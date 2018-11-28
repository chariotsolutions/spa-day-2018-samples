require('chai')

before('e2e test: server startup', async function () {
    this.slow(5000)
    this.timeout(10000)

    const server = await require('../../src')
    global.server = server

    console.log('\n\nServer e2e init- tests below this line.')
    console.log('------------------------------------------✂--------- cut here\n\n')
})
