export {}

const axios = require('axios').default;

const scrapeExplore = async (category: string) => {
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

  // Scraped data
  const videos = [];

  // Scrape the url
  try {
    // Fetch data
    const response = await axios.get(url + `&page=1`);
    const res = response.data.gifs;

    // Get first 3 videos in response
    const topVideos = res.slice(0, 3);

    // Loop through response
    for (const video in topVideos) {
      // Video for category
      const categoryVideo = {
        id: res[video].id,
        thumbnail: res[video].urls.thumbnail,
        creator: res[video].userName,
        views: res[video].views,
      };

      // Push to respective arrays
      videos.push(categoryVideo);
    }
  } catch (error) {
    console.error(error);
  }

  // Structure response
  const response = { name: category, videos };

  return response;
};

module.exports = { scrapeExplore };
