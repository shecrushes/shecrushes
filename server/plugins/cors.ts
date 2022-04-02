export {};

const fastifyPlugin = require('fastify-plugin');

async function corsRegister(fastify, options) {
    // Cron jobs to update categories
    fastify.register(require('fastify-cors'), (instance) => async (req, callback) => {
        let corsOptions = {
            credentials: true,
            allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept"],
            origin: false
        }
        
        let originHostname = req.headers.origin || req.ip || '';
        
        // Requests shecrushes and local servers will pass
        if (/(localhost|ngrok|127.0.0.1|shecrushes)/g.test(originHostname)) {
            corsOptions.origin = true
        } else {
            corsOptions.origin = false
        }
        callback(null, corsOptions) // callback expects two parameters: error and options
    })


}

module.exports = fastifyPlugin(corsRegister);
