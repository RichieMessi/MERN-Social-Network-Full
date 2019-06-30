const fs = require('fs')
const formidable = require('formidable')
const _ = require('lodash')
const User = require('../models/user')

const userById = (req, res, next, id) => {
    console.warn('======================================')
    console.warn(id)
    console.warn('======================================')
    User.findById(id)
    // populate followers and following users array
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({error: "User Not Found"})
        }
        req.profile = user // adds profile object in req with user info
        next()
    })
}


const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id
    if(!authorized) {
        return res.status(403).json({error: "User is not authorized to perform this action"})
    }
}


const allUsers = (req, res) => {
    // User.find()
    // .then(users => res.json({users}))
    // .then(() => console.warn(users))
    
    User.find((err, users) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        // res.json({
        //     users: users
        // })
        res.json(users)
    })
    .select('id name email created_at bio')
}

const getUser = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}


// const updateuser = (req, res, next) => {
//     let user = req.profile
//     console.warn(user)
//     user = _.extend(user, req.body) // extend - mutate the source object
//     user.updated = Date.now()
//     user.save((err) => {
//         if(err) {
//             return res.status(400).json({
//                 error: "You are not authorized to perform this action"
//             })
//         }
//         user.hashed_password = undefined
//         user.salt = undefined
//         res.json({user: user})
//     })
// }

const updateuser = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            })
        }
        // save user
        let user = req.profile
        user = _.extend(user, fields)
        user.updated = Date.now()

        if(files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }

        console.warn('#####################################')
        console.warn(files)
        console.warn(files.photo)
        console.warn('#####################################')

        user.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            console.warn(user)
            user.hashed_password = undefined
            user.salt = undefined
            res.json(user)
        })
    })
}

const deleteUser = (req, res, next) => {
    let user = req.profile
    user.remove((err, user) => {
        if(err) {
            return res.status(400).json({error: err})
        }
        // user.hashed_password = undefined
        // user.salt = undefined
        // res.json({user: user})
        res.json({message: "User deleted Successfully"})
    })
}

const userPhoto = (req, res, next) => {
    if(req.profile.photo.data) {
        res.set(("Content-Type", req.profile.photo.contentType));
        return res.send(req.profile.photo.data)
    } else {
        return res.status(404).json({message: "Profile Picture Not Updated"})
    }
    next()
}



const addFollowing = (req, res, next) => {
    console.log('NODE JS FUNCTION CHLA')
    User.findByIdAndUpdate(
        req.body.userId, 
        { $push: {following: req.body.followId} },
        (err, result) => {
            if(err) {
                return res.status(400).json({error: err})
            } 
            console.warn('result')
            next()
        }
    )
} 

const addFollower = (req, res) => {
    console.log('NODE JS FUNCTION CHLA')
    User.findByIdAndUpdate(
        req.body.followId, 
        { $push: {followers: req.body.userId} }, 
        {new: true}
    )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({error: err})
        }
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
    })
}



const removeFollowing = (req, res, next) => {
    console.warn('REMOVE FOLLOWING RAN')
    User.findByIdAndUpdate(
        req.body.userId, 
        { $pull: {following: req.body.unfollowId} },
        (err, result) => {
            if(err) {
                return res.status(400).json({error: err})
            } 
            next()
        })
}



const removeFollower = (req, res) => {
    console.warn('REMOVE FOLLOWER RAN')
    User.findByIdAndUpdate(
        req.body.unfollowId, 
        { $pull: {followers: req.body.userId} }, 
        {new: true}
    )
    .populate("following", "_id name")
    .populate("followers", "_id name")
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({error: err})
        }
        result.hashed_password = undefined
        result.salt = undefined
        res.json(result)
    })
}


module.exports = {
    userById,
    hasAuthorization,
    allUsers,
    getUser,
    updateuser,
    deleteUser,
    userPhoto,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower
}