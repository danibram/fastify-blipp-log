import { IncomingMessage, Server, ServerResponse } from 'http'

declare module 'fastify' {
    export interface FastifyInstance {
        prettyPrintRoutes(): void
    }
}
