export {}

const fastifyPlugin = require('fastify-plugin');

async function redisConnector(fastify, options) {
  fastify
    .register(require('fastify-redis'), {
      host: process.env.HOSTNAME,
      port: process.env.REDISPORT,
      password: process.env.PASSWORD,
      namespace: 'default',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'homepage_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'lesbian_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'femboy_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'cumshot_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'gay_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'petite_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'celebrity_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'tiktok_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'rough_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'teen_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'blowjob_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'explorePage_cache',
    })

    // New categories
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'ass_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'asian_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'tits_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'blonde_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'webcam_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'dildo_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'pussy_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'amateur_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'hardcore_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'doggystyle_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'facial_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'anal_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'bigtits_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'pornstar_cache',
    })
     .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'bbc_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: '18yearsold_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'riding_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'latina_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'homemade_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'nsfw_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'japanese_cache',
    })
    .register(require('fastify-redis'), {
      host: 'localhost',
      namespace: 'threesome_cache',
    })
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(redisConnector);
