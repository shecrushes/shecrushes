export {}

const axios = require('axios').default;
const format = require('pg-format');
const { nanoid } = require('nanoid')
const genUsername = require("unique-username-generator");

// Functions
const { filterHashTags } = require('../functions/filterHashtags');
const { randomizeArray } = require('../functions/randomizeArray');

// Data
const comments = require("../scrapingData/comments")

// Types
interface redisVideo {
  id: string;
  thumbnail: string;
  video_url: string;
  video_width: string;
  video_height: string;
  tags: string[];
  creator: string;
  views: number;
  likes: number;
}

interface postgresVideo {
  id: string;
  title: string;
  thumbnail: string;
  video_url: string;
  pornstar: string;
  createDate: number;
  poster: string;
  tags: string[];
  views: number;
  likes: number;
}

async function updateCategory(fastify, category: string, redisCacheKey: string) {
  /**
   * Given the category from the function, the redgifs url will be structured
   *
   * However, in the case that the category is equal to 'homepage' then set it
   * to an empty string because that means I need to scrape the redgifs main trending
   * category which has no search query.
   *
   * @return {string}
   */
  let url = `https://api.redgifs.com/v2/gifs/search?search_text=${category}&order=trending&type=g&ratio=v`;

  /**
   * Given the category from the function, redis key will be structured
   *
   * I have 2 keys for each category, one for development and one for production. We
   * check the current node environment and build the key accordingly.
   *
   * @return {string}
   */
  let redisKey =
    process.env.NODE_ENV === 'development'
      ? `${redisCacheKey.toLowerCase()}_dev`
      : `${redisCacheKey.toLowerCase()}_prod`;

  // Scraped data arrays
  let redisCategory = [];
  let postgresScrapedData = [];

  // Scrape the the first 7 pages of the url
  for (let index = 0; index < 7; index++) {
    try {
      // Fetch data
      const response = await axios.get(url + `&page=${index}`);
      const res = response.data.gifs;

      // Filter through response
      for (const video in res) {
        // Filter video tags
        const videoTags = filterHashTags(res[video].tags);

        // Video for category
        const redisCategoryVideo: redisVideo = {
          id: res[video].id,
          thumbnail: res[video].urls.thumbnail,
          video_url: res[video].urls.sd,
          video_width: res[video].width,
          video_height: res[video].height,
          tags: videoTags,
          creator: res[video].userName,
          views: res[video].views,
          likes: res[video].likes 
        };

        // Video for postgres database
        const postgresVideo: postgresVideo[] = [
          res[video].id, // video_id
          res[video].id, // title
          res[video].urls.hd, // video_hd
          res[video].urls.sd, // video_sd
          res[video].userName, // pornstar
          JSON.stringify(videoTags), // tags
          res[video].createDate, // createDate
          res[video].urls.poster, // thumbnail
          res[video].views, // views
          res[video].likes // likes
        ];

        // Push to respective arrays
        redisCategory.push(redisCategoryVideo);
        postgresScrapedData.push(postgresVideo);
      }
    } catch (error) {}
  }

  // Update redis & push to postgres
  if (Array.isArray(redisCategory)) {
    // Update redis category cache
    fastify.redis['default'].set(
      redisKey,
      JSON.stringify(redisCategory),
      (err) => {
        if (err) console.log(err);
      }
    );

    // Push data to postgres
    fastify.pg.query(
      format(
        'INSERT INTO videos (video_id, title, video_hd, video_sd, pornstar, tags, createdate, thumbnail, views, likes) VALUES %L ON CONFLICT (video_id) DO NOTHING',
        postgresScrapedData
      ), [],
      (err) => {
        if (err) console.log(err);
      }
    );

    // Update spinner
    console.log(`Finished scraping ${category || 'Homepage'} category.`);
  }
}

module.exports = {updateCategory};
