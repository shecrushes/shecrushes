export {}


async function userData(req, res) {
    // Extract query parameters
    const username = req.params.username;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Postgres
    const client = await this.pg.connect();

    try {
        if(username) {
            const userDataPromises = [];

            // User video likes
            const promise1 = client.query(
                'SELECT likes.username, likes.created_at, video.thumbnail, video.video_id FROM likes LEFT JOIN LATERAL (SELECT videos.thumbnail AS thumbnail, videos.video_id as video_id FROM videos AS videos WHERE videos.video_id = likes.video_id) AS video on true WHERE likes.username = $1 AND likes.comment_id IS NULL ORDER BY likes.created_at DESC OFFSET $2 LIMIT $3;',
                [username, page, limit]
            )
            userDataPromises.push(promise1);

            // User comments
            const promise2 = client.query(
                'SELECT * FROM comments WHERE username = $1 ORDER BY created_at DESC OFFSET $2 LIMIT $3;',
                [username, page, limit]
            )
            userDataPromises.push(promise2);

            if(page === 0) {
                // User likes count
                const promise3 = client.query(
                    'SELECT COUNT(*) FROM likes WHERE username = $1 AND comment_id IS NULL;',
                    [username]
                )
                userDataPromises.push(promise3);
                
                // User comment count
                const promise4 = client.query(
                    'SELECT COUNT(*) FROM comments WHERE username = $1',
                    [username]
                )
                userDataPromises.push(promise4);
            }

            // Execute queries
            const userData = await Promise.all(userDataPromises)

            // Extract data from query
            const userLikes = userData[0].rows;
            const userComments = userData[1].rows;
            const userLikesCount = userData[2]?.rows;
            const userCommentsCount = userData[3]?.rows;


            // Success response
            res.code(200).header('X-Powered-By', 'Cats on keyboards').send({
                userLikes,
                userComments,
                "counts": {
                    userLikesCount,
                    userCommentsCount
                },
            })
            
        } else {
            res.code(401).header('X-Powered-By', 'Cats on keyboards')
            .send({ code: 400, message: 'No username provided' });
        }
    } finally {
        client.release();
    }
}

module.exports = { userData }