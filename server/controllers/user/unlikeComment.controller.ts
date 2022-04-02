export {}

// Firebase 
const { getAuth } = require('firebase-admin/auth');

async function unlikeComment(req, res) {
    // Extract user token
    const { userToken, commentId } = req.body
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
    
                    // Insert like into postgres
                    try {                  
                        await client.query(
                            'DELETE FROM likes WHERE user_id=$1 AND comment_id=$2',
                            [userId, commentId]
                        )
    
                        // Success response
                        res.code(200).header('X-Powered-By', 'Cats on keyboards').send('200')
                    } catch (error) {
                        console.log(error)
                        if(error.code === '23505') {
                            res.code(400)
                            .header('X-Powered-By', 'Cats on keyboards')
                            .send({ code: 400, message: 'Unable to unlike the same comment again.' });
                        } else {
                            res.code(400)
                            .header('X-Powered-By', 'Cats on keyboards')
                            .send({ code: 400, message: 'There has been a problem unliking the comment.' });
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
        client.release()
    }
}

module.exports = { unlikeComment }