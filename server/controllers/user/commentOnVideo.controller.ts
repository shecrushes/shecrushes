export {}

// Firebase 
const { getAuth } = require('firebase-admin/auth');

async function commentOnVideo(req, res) {
    // Extract user token
    const { 
        userToken, 
        videoId,
        commentText 
    } = req.body
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
                    const username = decodedToken.name;

                    // Insert comment into postgres
                    try {          
                        await client.query(
                            'INSERT INTO comments (user_id, video_id, username, content) VALUES ($1, $2, $3, $4)',
                            [userId, videoId, username, commentText]
                        )
    
                        // Success response
                        res.code(200).header('X-Powered-By', 'Cats on keyboards').send('200')
                    } catch (error) {
                        if(error.code === '23505') {
                            res.code(409)
                            .header('X-Powered-By', 'Cats on keyboards')
                            .send({ code: 409, message: 'Error.' });
                        } else {
                            res.code(401)
                            .header('X-Powered-By', 'Cats on keyboards')
                            .send({ code: 401, message: 'There has been a problem commenting on the video.' });
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

module.exports = { commentOnVideo }