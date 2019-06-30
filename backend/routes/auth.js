const express = require('express')
const router = express.Router()


const { createUserValidator, userSignInValidator } = require('../validator')
const { signUp, signIn, signOut } = require('../controllers/auth')
const { userById } = require('../controllers/user')


router.post('/signup', createUserValidator, signUp)
router.post('/signin', userSignInValidator, signIn)
router.get('/signout', signOut)

// any route containing :userId, out app will execute userById()
router.param('userId', userById)

module.exports = router