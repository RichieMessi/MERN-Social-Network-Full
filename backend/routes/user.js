const express = require('express')
const router = express.Router()

const { userById, allUsers, getUser, updateuser, deleteUser, userPhoto, addFollowing, addFollower, removeFollowing,
    removeFollower } = require('../controllers/user')
const { requireSignIn } = require('../controllers/auth')

router.put('/user/follow', requireSignIn, addFollowing, addFollower)
router.put('/user/unfollow', requireSignIn, removeFollowing, removeFollower)

router.get('/users', allUsers)

router.get('/user/:userId', requireSignIn, getUser)
router.put('/user/:userId', requireSignIn, updateuser)
router.delete('/user/:userId', requireSignIn, deleteUser)

router.get('/user/photo/:userId', userPhoto)

router.param('userId', userById)

module.exports = router