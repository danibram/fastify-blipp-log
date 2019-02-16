import * as fp from 'fastify-plugin'
import { IncomingMessage, Server, ServerResponse } from 'http'

type Iopts = {
    customLogger?: any
    tabLength?: any
}

declare module 'fastify' {
    export interface FastifyInstance<
        HttpServer = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse
    > {
        prettyPrintRoutes(): void
    }
}

export default fp(function(fastify, opts: Iopts, next) {
    const routes: any = []
    const logger = opts.customLogger ? opts.customLogger : fastify.log

    opts.tabLength = opts.tabLength ? opts.tabLength : 13

    fastify.addHook('onRoute', routeOptions => {
        routes.push(routeOptions)
    })

    fastify.decorate('prettyPrintRoutes', () => {
        if (routes.length === 0) {
            return
        }

        ;(routes as any).sort((a, b) =>
            a.url !== b.url ? a.url > b.url : a.method > b.method
        )

        logger.info(`🚀  Routes:`)

        routes.forEach(route => {
            ;(!Array.isArray(route.method)
                ? [route.method]
                : route.method.sort((a, b) => a > b)
            ).forEach(method => {
                const label = `[${method.toUpperCase()}]`
                const spaces = opts.tabLength - label.length

                logger.info(
                    `${label}${new Array(spaces).join(' ')}${route.url.replace(
                        /(?:\:[\w]+|\[\:\w+\])/g,
                        '$&'
                    )}`
                )
            })
        })
    })

    next()
})
