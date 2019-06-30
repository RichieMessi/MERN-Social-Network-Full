const express = require('express')
const router = express.Router()
// const validator = require('../validator')

const { createPostValidator } = require('../validator')

const { userById } = require('../controllers/user')

const { getPosts, 
    getPost, 
    createPost, 
    postsByUser, 
    postById, 
    isPoster, 
    updatePost, 
    deletePost, 
    postPhoto,
    like,
    unlike,
    comment,
    uncomment
 } = require('../controllers/post')
const { requireSignIn } = require('../controllers/auth')

router.get('/', getPosts)

router.put('/post/like', requireSignIn, like)
router.put('/post/unlike', requireSignIn, unlike)

router.put('/post/comment', requireSignIn, comment)
router.put('/post/uncomment', requireSignIn, uncomment)


router.get('/post/:postId', getPost)
// router.post('/post', requireSignIn, createPostValidator, createPost)
router.post('/post/new/:userId', requireSignIn, createPost, createPostValidator)

router.get('/posts/by/:userId', postsByUser)

router.delete('/post/:postId', requireSignIn, isPoster, deletePost)


router.put('/post/:postId', requireSignIn, isPoster, updatePost)

router.get('/post/photo/:postId', postPhoto)




router.param('userId', userById)
router.param('postId', postById)

module.exports = router