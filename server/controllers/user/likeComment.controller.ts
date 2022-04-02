export {}

// Firebase 
const { getAuth } = require('firebase-admin/auth');

async function likeComment(req, res) {
    // Extract user token
    const { userToken, commentId, username } = req.body
    const auth = getAuth();

    // Postgres
    const client = await this.pg.connect();

    try {
        // Verify token 
        if(userToken) {
            auth
                .verifyIdToken(userToken)
                .then(async(decodedToken) => {
                    // User id
                    const userId = decodedToken.uid;
                    const userUsername = decodedToken.name;

                    // Insert like into postgres
                    try {                  
                        if(username === userUsername) {
                            await client.query(
                                'INSERT INTO likes (user_id, username, comment_id) VALUES ($1, $2, $3)',
                                [userId, userUsername, commentId]
                            )
        
                            // Success response
                            res.code(200).header('X-Powered-By', 'Cats on keyboards').send('200')
                        }
                    } catch (error) {
                        if(error.code === '23505') {
                            res.code(400)
                            .header('X-Powered-By', 'Cats on keyboards')
                            .send({ code: 401, message: 'Unable to like the same comment again.' });
                        } else {
                            res.code(400)
                            .header('X-Powered-By', 'Cats on keyboards')
                            .send({ code: 401, message: 'There has been a problem liking the comment.' });
                        }
                    } 
                })
                .catch((error) => {
                    res.code(401)
                    .header('X-Powered-By', 'Cats on keyboards')
                    .send({ code: 401, message: error.errorInfo.message });
                });
        } else {
            res.code(401).header('X-Powered-By', 'Cats on keyboards')
            .send({ code: 400, message: 'No id provided' });
        }
    } finally {
        client.release();
    }
}

module.exports = { likeComment }