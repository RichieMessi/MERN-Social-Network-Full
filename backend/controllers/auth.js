const jwt = require('jsonwebtoken')
require('dotenv').config()
const expressJwt = require('express-jwt')
const User = require('../models/user')

const signUp = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email })

    if (userExists) {
        return res.status(403).json({ error: "Email is taken" })
    }

    const user = await new User(req.body)
    await user.save()
    // res.status(200).json({ user: user})
    res.status(200).json({ message: "Sign Up Seccessful. Please log in"})
}

const signIn = (req, res) => {
    const { email, password } = req.body

    // find user based on email
    User.findOne( {email} ,(err, user) => {
        if(err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist. Please try again"
            })
        }

        // if user is found, make sure the email and password match
        // create authenticate method in model and use here
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password does not match"
            })
        }

        // if error or no user
        // if user, authenticate
        // generate a token  with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

        // persist the token as 'token' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})

        // return reqponse with user and token to frontent client
        const { _id, name, email } = user
        return res.json({token, user: { _id, email, name }})
    })
}

const signOut = (req, res) => {
    res.clearCookie('t')
    return res.json({message: "Sign Out Successful"})
}

const requireSignIn = expressJwt({

    // if the token is valid, express jwt appends the verified users id
    // in an auth key to the request object 

  secret: process.env.JWT_SECRET,
  userProperty: "auth"
})

module.exports = {
    signUp,
    signIn,
    signOut,
    requireSignIn
}