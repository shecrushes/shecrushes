const fastifyPlugin = require('fastify-plugin');

async function postgresConnector(fastify, options) {
  fastify.register(require('fastify-postgres'), {
    connectionString:
      process.env.NODE_ENV === 'production'
        ? process.env.POSTGRES_CONNECTION_PROD
        : process.env.POSTGRES_CONNECTION_DEV,
  });
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(postgresConnector);
