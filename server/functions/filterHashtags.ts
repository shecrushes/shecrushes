// Categories
const tags = require('../scrapingData/categories');

const filterHashTags = (videoHashTags: string[]) => {
  // Found tags that match
  const foundTags = [];

  if (videoHashTags) {
    // Loop over the tags array
    for (let tagsIndex = 0; tagsIndex < tags.length; tagsIndex++) {
      const tag = tags[tagsIndex].toLowerCase();

      // For every item in the tags array, loop over the videoTags array
      for (
        let videoTagsIndex = 0;
        videoTagsIndex < videoHashTags.length;
        videoTagsIndex++
      ) {
        const videoTag = videoHashTags[videoTagsIndex].toLowerCase();

        // If the 2 tags match and foundTags doesn't have more than 4 items, then push to array
        if (tag === videoTag && foundTags.length < 4) {
          foundTags.push(videoTag);
        }
      }
    }
  }

  return foundTags;
};

module.exports = { filterHashTags };
