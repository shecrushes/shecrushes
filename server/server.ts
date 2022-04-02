const fastify = require('fastify')({ logger: true, pluginTimeout: 20000 });
const dotenv = require('dotenv');
const helmet = require('fastify-helmet');
dotenv.config({ path: './config.env' });

// Firebase 
const { firebaseConnector } = require("./plugins/firebase")

// Functions
const { fillRedisCache } = require('./functions/fillRedisCache');

// Server plugins
fastify.register(helmet);

// Cors
fastify.register(require('./plugins/cors'));
fastify.after((err) =>
  err ? console.log(err) : console.log('✅ | Cors plugin is ready.')
);

// Application plugins
fastify.register(require('./plugins/redis'));
fastify.after((err) =>
  err ? console.log(err) : console.log('✅ | Redis plugin is ready.')
);

fastify.register(require('./plugins/postgres'));
fastify.after((err) =>
  err ? console.log(err) : console.log('✅ | Postgres plugin is ready.')
);

fastify.register(require('./plugins/cronJobs'));
fastify.after((err) =>
  err ? console.log(err) : console.log('✅ | Cronjob plugin is ready.')
);

// Routes
fastify.register(require('./routes/routes'));

const startup = async () => {
  try {
    // Start fastify server
    const PORT = process.env.PORT || 3001;
    await fastify.listen(PORT);

    // Init firebase
    firebaseConnector()

    if (process.env.NODE_ENV === 'production') {
      console.log(`         
      ░██████╗██╗░░██╗███████╗░█████╗░██████╗░██╗░░░██╗░██████╗██╗░░██╗███████╗░██████╗
      ██╔════╝██║░░██║██╔════╝██╔══██╗██╔══██╗██║░░░██║██╔════╝██║░░██║██╔════╝██╔════╝
      ╚█████╗░███████║█████╗░░██║░░╚═╝██████╔╝██║░░░██║╚█████╗░███████║█████╗░░╚█████╗░
      ░╚═══██╗██╔══██║██╔══╝░░██║░░██╗██╔══██╗██║░░░██║░╚═══██╗██╔══██║██╔══╝░░░╚═══██╗
      ██████╔╝██║░░██║███████╗╚█████╔╝██║░░██║╚██████╔╝██████╔╝██║░░██║███████╗██████╔╝
      ╚═════╝░╚═╝░░╚═╝╚══════╝░╚════╝░╚═╝░░╚═╝░╚═════╝░╚═════╝░╚═╝░░╚═╝╚══════╝╚═════╝░
      is online ;)
    `);

      // Start cron jobs
      fastify.cron.startAllJobs();
      console.log('Running in production');

      // Fill redis cache
      fillRedisCache(fastify);
    } else {
      console.log(`✅ | Server running at http://localhost:${PORT}`);
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
startup();
