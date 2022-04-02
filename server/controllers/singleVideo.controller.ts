async function singleVideo(req, reply) {
  const client = await this.pg.connect();

  // Return error if no video is provided
  if(!req.params.video_id) {
    reply.code(400).header('X-Powered-By', 'Cats on keyboards').send('Please include a video id.');
  }

  try {
    // Return video
    const video = await client.query(
      'SELECT video_id, title, video_hd, video_sd, thumbnail, pornstar, createdate, tags, views FROM videos WHERE video_id=$1',
      [req.params.video_id]
    );

    // Get amount of likes
    const likes = await client.query(
      'SELECT COUNT(*) FROM likes WHERE video_id=$1',
      [req.params.video_id]
    )

    // Merge both responses
    const newObj = {...video.rows[0], likes: likes.rows[0].count}

    reply.code(200).header('X-Powered-By', 'Cats on keyboards').send(newObj);
  } finally {
    client.release();
  }
}

module.exports = { singleVideoRoute: singleVideo };
