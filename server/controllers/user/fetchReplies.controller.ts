export {}

async function fetchReplies(req, res) {
    // Extract query parameters
    const commentId = req.query.commentId
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    // Postgres
    const client = await this.pg.connect();

    // Fetch replies to a comment
    try {         
        const replies = await client.query(
            'SELECT comments.comment_id, comments.created_at, comments.username, comments.content, l.likes_count FROM comments LEFT JOIN LATERAL (SELECT COUNT(*) AS likes_count FROM likes AS likes WHERE likes.comment_id = comments.comment_id) AS l on true WHERE comments.reply_to = $1 ORDER BY comments.created_at ASC OFFSET $2 LIMIT $3',
            [commentId, page, limit]
        )

        // Success response
        res.code(200).header('X-Powered-By', 'Cats on keyboards').send(
            replies.rows
        )
    } catch (error) {
        console.log(error)
        res.code(401)
        .header('X-Powered-By', 'Cats on keyboards')
        .send({ code: 401, message: 'There has been a problem fetching the replies.' });
    } finally {
        client.release()
    }
}

module.exports = { fetchReplies }