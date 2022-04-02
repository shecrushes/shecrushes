// Functions
const { scrapeExplore } = require('../functions/scrapeExplore');

// Categories
const categories = require('../scrapingData/categories');

async function updateExplore(fastify) {
  /**
   * Given the category from the function, redis key will be structured
   *
   * I have 2 keys for each category, one for development and one for production. We
   * check the current node environment and build the key accordingly.
   *
   * @return {string}
   */
  let redisKey =
    process.env.NODE_ENV === 'development' ? `explore_dev` : `explore_prod`;

  // Scraped data
  let exploreVideos = [];

  // Structured category object
  for (const categoryIndex in categories) {
    // Scrape video from single category
    const categoryResponse = await scrapeExplore(categories[categoryIndex]);

    // Push results to array
    exploreVideos.push(categoryResponse);
  }

  // Update redis
  if (Array.isArray(exploreVideos)) {
    // Update redis category cache
    fastify.redis['default'].set(
      redisKey,
      JSON.stringify(exploreVideos),
      (err) => {
        if (err) console.log(err);
      }
    );

    // Update spinner
    console.log(`Finished scraping Explore page.`);
  }
}

module.exports = { updateExplore };
