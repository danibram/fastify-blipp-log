const prettyRoutes = require('../build/main/index.js').default
const fastify = require('fastify')({
    logger: {
        prettyPrint: { colorize: true }
    }
})

fastify.register(prettyRoutes)

fastify.all('/cats', async () => ({}))

const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.prettyPrintRoutes()
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()
