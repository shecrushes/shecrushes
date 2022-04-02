const { promisify } = require('util');

async function explore(req, reply) {
  try {
    // Get function to bind to redis databse
    const GET_ASYNC = promisify(this.redis['default'].get).bind(
      this.redis['default']
    );

    // Get data from cache function
    const GET_CACHE_ASYNC = promisify(this.redis[`explorePage_cache`].get).bind(
      this.redis['explorePage_cache']
    );

    // Set data to cache function
    const SET_CACHE_ASYNC = promisify(this.redis[`explorePage_cache`].set).bind(
      this.redis[`explorePage_cache`]
    );

    // Get cache
    const cacheRes = await GET_CACHE_ASYNC(`explorePageCacheData`);

    // Check if cache exists
    if (cacheRes) {
      // Parsed data & data length
      const cachedData = JSON.parse(cacheRes);

      // Query params
      const cachedPageQuery = parseInt(req.query.page) || undefined;
      const cachedLimitQuery = parseInt(req.query.limit) || undefined;

      // Randomize explore categories
      let m = cachedData.length;
      let i: number;
      let t: number;

      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = cachedData[m];
        cachedData[m] = cachedData[i];
        cachedData[i] = t;
      }

      // Slice data based on page and limit
      const cachedStartIndex = (cachedPageQuery - 1) * cachedLimitQuery;
      const cachedEndIndex = cachedPageQuery * cachedLimitQuery;

      const cachedDataPaginated = cachedData.slice(
        cachedStartIndex,
        cachedEndIndex
      );

      // Return data
      reply
        .code(200)
        .header('X-Powered-By', 'Cats on keyboards')
        .send(cachedDataPaginated);
    } else {
      // Fetch data from redis
      const unCachedRes = await GET_ASYNC(
        process.env.NODE_ENV === 'development' ? `explore_dev` : `explore_prod`
      );

      // Cache the key's data
      await SET_CACHE_ASYNC(`explorePageCacheData`, unCachedRes, 'EX', 3600); // expire in an hour: 3600

      // Parsed data & data length
      const uncachedData = JSON.parse(unCachedRes);

      // Query params
      const unCachedPageQuery = parseInt(req.query.page) || undefined;
      const unCachedLimitQuery = parseInt(req.query.limit) || undefined;

      // Slice data based on page and limit
      const unCachedStartIndex = (unCachedPageQuery - 1) * unCachedLimitQuery;
      const unCachedEndIndex = unCachedPageQuery * unCachedLimitQuery;

      const uncachedDataPaginated = uncachedData.slice(
        unCachedStartIndex,
        unCachedEndIndex
      );

      // Return data
      reply
        .code(200)
        .header('X-Powered-By', 'Cats on keyboards')
        .send(uncachedDataPaginated);
    }
  } catch (error) {
    reply.code(400).header('X-Powered-By', 'Cats on keyboards').send({
      code: 400,
      message: 'Something went wrong.',
      error,
    });
  }
}

module.exports = { exploreRoute: explore };
