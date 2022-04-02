export {}

// Controller
const {
  updateCategory,
} = require('../controllers/scrapeCategories.controller');
const { updateExplore } = require('../controllers/scrapeExplore.controller');

const fillRedisCache = async (fastify) => {
  // Start loader
  console.log('Scraping all categories...');

  // Fill redis cache
  Promise.allSettled([
    updateCategory(fastify, '', 'homepage'),
    updateCategory(fastify, 'Lesbian', 'lesbian'),
    updateCategory(fastify, 'Trans', 'femboy'),
    updateCategory(fastify, 'Cumshot', 'cumshot'),
    updateCategory(fastify, 'Tits', 'tits'),
    updateCategory(fastify, 'Gay', 'gay'),
    updateCategory(fastify, 'Petite', 'petite'),
    updateCategory(fastify, 'Celebrity', 'celebrity'),
    updateCategory(fastify, 'TikTok', 'tiktok'),
    updateCategory(fastify, 'Rough', 'rough'),
    updateCategory(fastify, 'Teen', 'teen'),
    updateCategory(fastify, 'Blowjob', 'blowjob'),
    updateCategory(fastify, 'Ass', 'ass'),
    updateCategory(fastify, 'Asian', 'asian'),
    updateCategory(fastify, 'Blonde', 'blonde'),
    updateCategory(fastify, 'Webcam', 'webcam'),
    updateCategory(fastify, 'Dildo', 'dildo'),
    updateCategory(fastify, 'Pussy', 'pussy'),
    updateCategory(fastify, 'Amateur', 'amateur'),
    updateCategory(fastify, 'Hardcore', 'hardcore'),
    updateCategory(fastify, 'Doggystyle', 'doggystyle'),
    updateCategory(fastify, 'Facial', 'facial'),
    updateCategory(fastify, 'Anal', 'anal'),
    updateCategory(fastify, 'Big Tits', 'bigtits'),
    updateCategory(fastify, 'Pornstar', 'pornstar'),
    updateCategory(fastify, 'BBC', 'bbc'),
    updateCategory(fastify, '18 Years Old', '18yearsold'),
    updateCategory(fastify, 'Riding', 'riding'),
    updateCategory(fastify, 'Latina', 'latina'),
    updateCategory(fastify, 'Homemade', 'homemade'),
    updateCategory(fastify, 'NSFW', 'nsfw'),
    updateCategory(fastify, 'Japanese', 'japanese'),
    updateCategory(fastify, 'Threesome', 'threesome'),

    // Explore page
    updateExplore(fastify),
  ]);
};

module.exports = { fillRedisCache };
