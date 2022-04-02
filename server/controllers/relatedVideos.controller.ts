// SELECT tags FROM videos WHERE tags SIMILAR TO '%(Teen||Lesbian||Ass)%';

async function relatedVideos(req, reply) {
  const client = await this.pg.connect();

  try {
    const { rows } = await client.query(
      'SELECT video_id, title, thumbnail, pornstar, tags, views FROM videos WHERE tags SIMILAR TO $1 LIMIT 5',
      [`%${req.query.tag}%`]
    );
    reply.code(200).header('X-Powered-By', 'Cats on keyboards').send(rows);
  } finally {
    client.release();
  }
}

module.exports = { relatedVideosRoute: relatedVideos };
