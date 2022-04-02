export {}

async function fetchComments(req, res) {
    // Extract query parameters
    const videoId = req.query.videoId
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Postgres
    const client = await this.pg.connect();

    // Fetch 
    try {         
        const commentsResponse = await Promise.all([
            // This query first selects all the required fields, it then uses a lateral join to
            // select the number of replies that each comment has. It repeats this step for likes too.
            // Finally we select the rows only if they match the videoId (top level comments) and sort the comments by likes
            client.query(
                'SELECT comments.comment_id, comments.created_at, comments.username, comments.content, r.reply_count, l.likes_count FROM comments LEFT JOIN LATERAL (SELECT count(replies.comment_id) AS reply_count FROM comments AS replies WHERE comments.comment_id = replies.reply_to) AS r on true LEFT JOIN LATERAL (SELECT COUNT(*) AS likes_count FROM likes AS likes WHERE likes.comment_id = comments.comment_id) AS l on true WHERE comments.video_id = $1 ORDER BY l.likes_count DESC OFFSET $2 LIMIT $3',
                [videoId, page, limit]
            ),
            client.query(
                'SELECT COUNT(*) FROM comments WHERE video_id = $1',
                [videoId]
            )
        ])

        // Extract data from query
        const commentsItems = commentsResponse[0].rows;
        const commentsCount = commentsResponse[1].rows;

        // Success response
        res.code(200).header('X-Powered-By', 'Cats on keyboards').send({
            commentsItems,
            commentsCount
        })
    } catch (error) {
        console.log(error)
        res.code(401)
        .header('X-Powered-By', 'Cats on keyboards')
        .send({ code: 401, message: 'There has been a problem fetching the comments.' });
    } finally {
        client.release()
    }
}

module.exports = { fetchComments }