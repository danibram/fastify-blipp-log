import test from 'ava'
import * as fastify from 'fastify'
import * as pino from 'pino'
import prettyRoutes from '.'

const opts: any = {
    prettyPrint: { colorize: true }
}

test('with fastify Logger', async t => {
    const server = fastify({
        logger: opts
    })

    server.register(prettyRoutes)

    server.all('/cats', async () => ({}))

    await server.ready()
    t.notThrows(server.prettyPrintRoutes)
})

test('with custom Logger', async t => {
    const server = fastify()
    server.register(prettyRoutes, {
        customLogger: pino(opts)
    })

    server.all('/cats', async () => ({}))

    await server.ready()
    t.notThrows(server.prettyPrintRoutes)
})

test('with no routes', async t => {
    const server = fastify()
    server.register(prettyRoutes)

    await server.ready()
    t.notThrows(server.prettyPrintRoutes)
})
