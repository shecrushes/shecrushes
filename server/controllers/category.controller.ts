export {}
const { promisify } = require('util');

async function category(
  req,
  reply
) {
  try {
    // Extract key from query tag
    const keyToFetch = req.query.key;

    // Get data from redis database
    const GET_ASYNC = promisify(this.redis['default'].get).bind(
      this.redis['default']
    );

    // Get data from cache
    const GET_CACHE_ASYNC = promisify(
      this.redis[`${keyToFetch}_cache`].get
    ).bind(this.redis[`${keyToFetch}_cache`]);

    // Set data to cache
    const SET_CACHE_ASYNC = promisify(
      this.redis[`${keyToFetch}_cache`].set
    ).bind(this.redis[`${keyToFetch}_cache`]);

    // Get cache
    const cacheRes = await GET_CACHE_ASYNC(`${keyToFetch}CacheData`);
    
    // Check if cache exists
    if (cacheRes) {
      // Parsed data & data length
      const cachedData = JSON.parse(cacheRes);

      // Query params
      const cachedPageQuery = parseInt(req.query.page) || undefined;
      const cachedLimitQuery = parseInt(req.query.limit) || undefined;

      // Randomize videos
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

      // Parse and return data
      reply
        .code(200)
        .header('X-Powered-By', 'Cats on keyboards')
        .send(cachedDataPaginated);
    } else {
      // Fetch data from redis
      const unCachedRes = await GET_ASYNC(
        process.env.NODE_ENV === 'development'
          ? `${keyToFetch}_dev`
          : `${keyToFetch}_prod`
      );

      // Cache the key's data
      await SET_CACHE_ASYNC(`${keyToFetch}CacheData`, unCachedRes, 'EX', 3600); // expire in an hour: 3600

      // Parsed data & data length
      const uncachedData = JSON.parse(unCachedRes);

      // Query params
      const unCachedPageQuery = parseInt(req.query.page) || undefined;
      const unCachedLimitQuery = parseInt(req.query.limit) || undefined;

      // Slice data based on page and limit
      const unCachedStartIndex = (unCachedPageQuery - 1) * unCachedLimitQuery;
      const unCachedEndIndex = unCachedPageQuery * unCachedLimitQuery;

      const homepageUncachedDataPaginated = uncachedData.slice(
        unCachedStartIndex,
        unCachedEndIndex
      );

      // Parse and return data
      reply
        .code(200)
        .header('X-Powered-By', 'Cats on keyboards')
        .send(homepageUncachedDataPaginated);
    }
  } catch (error) {
    reply
      .code(400)
      .header('X-Powered-By', 'Cats on keyboards')
      .send({ code: 400, message: 'This key does not exist' });
  }
}

module.exports = { categoryRoute: category };
