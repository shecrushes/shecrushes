export {};

const fastifyPlugin = require('fastify-plugin');

// Functions
const { fillRedisCache } = require('../functions/fillRedisCache');

async function cronJobsRegister(fastify, options) {
  // Cron jobs to update categories
  fastify.register(require('fastify-cron'), {
    jobs: [
      {
        name: 'Fill redis cache',
        cronTime: '0 */1 * * *',
        onTick: (server) => {
          fillRedisCache(server);
        },
        startWhenReady: true,
      },
    ],
  });
}

module.exports = fastifyPlugin(cronJobsRegister);
