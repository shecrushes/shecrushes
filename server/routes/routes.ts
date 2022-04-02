// Category
const { categoryRoute } = require('../controllers/category.controller');

// Explore
const { exploreRoute } = require('../controllers/explore.controller');

// Video tube controllers
const { singleVideoRoute } = require('../controllers/singleVideo.controller');
const { relatedVideosRoute } = require('../controllers/relatedVideos.controller');

// Like Operations
const { likeVideo } = require('../controllers/user/likeVideo.controller')
const { unlikeVideo } = require('../controllers/user/unlikeVideo.controller')
const { likeComment } = require('../controllers/user/likeComment.controller')
const { unlikeComment } = require('../controllers/user/unlikeComment.controller')

// Comment opreations
const { commentOnVideo } = require('../controllers/user/commentOnVideo.controller')

// Fetch Operations
const { fetchComments } = require('../controllers/user/fetchComments.controller')
const { fetchReplies } = require('../controllers/user/fetchReplies.controller')

// Reply Operation
const { replyToUser } = require('../controllers/user/replyToUser.controller')

// Profile
const { userData } = require('../controllers/profile/userData.controller')

// Types
interface IQuerystring {
  key: string;
  page: string;
  limit: string;
}

async function routes(fastify, options) {
  // Category route
  fastify.get('/category', categoryRoute);

  // Explore route
  fastify.get('/explore', exploreRoute);

  // Video tube routes
  fastify.get('/video/:video_id', singleVideoRoute);
  fastify.get('/video/relatedVideos', relatedVideosRoute);

  // Fetch user profile info
  fastify.get('/user/:username', userData)

  // Fetch comment operations
  fastify.get('/comments', fetchComments)
  fastify.get('/replies', fetchReplies)

  // 
  // Authenticated routes
  //

  // Like operations
  fastify.post('/authenticated/like', likeVideo)
  fastify.post('/authenticated/unlike', unlikeVideo)
  fastify.post('/authenticated/likeComment', likeComment)
  fastify.post('/authenticated/unlikeComment', unlikeComment)

  // Add comment operations
  fastify.post('/authenticated/comments/addComment', commentOnVideo)

  // Reply to comment
  fastify.post('/authenticated/comments/reply', replyToUser)


}
module.exports = routes;
