const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

const postById = (req, res, next, id) => {
    Post.findById(id)
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .select("_id title body created likes comments photo")
    .exec((err, post) => {
        if(err || !post) {
            return res.status(400).json({
                error: err
            })
        }
        req.post = post
        // console.log(post)
        next()
    })
}

// const getPosts = (req, res) => {
//     res.json({
//         posts: 
//                 [{
//                     title: "First Post"
//                 },
//                 {
//                     title: "Second Post"
//                 }]
//     })
// }

const getPosts = (req, res) => {
    const posts = Post.find()
    .populate("postedBy", "_id name created_at")
    .populate("comments", "text created")
    .populate("comments.postedBy", "_id name")
    .select("_id title body created likes")
    .sort({created: -1})
    // .then(posts => res.json({ posts }))
    .then(posts => res.json( posts ))
    .catch(err => console.log(err))
}

const getPost = (req, res) => {
    return res.json(req.post)
}

const createPost = (req, res, next) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {

        if(err) {
            return res.status(400).json({error: "Image could not be uploaded"})
        }

        let post = new Post(fields)

        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        post.postedBy = req.profile

        if(files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }

        post.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(result)
        })
    })

    // const post = new Post(req.body)
    // console.warn("Creating Post: ", new Post(req.body))
    // console.log(req.body)
    // post.save()
    //     .then(post => res.json({ post }))
}


const postPhoto = (req, res, next) => {
    if(req.post.photo.data) {
        res.set(("Content-Type", req.post.photo.contentType));
        return res.send(req.post.photo.data)
    } else {
        return res.status(404).json({message: "Post Picture Not Updated"})
    }
    next()
}


const postsByUser = (req, res, next) => {

    Post.find({postedBy: req.profile._id})
        .populate("postedBy", "_id name")
        .select("_id title body postedBy created likes")
        .sort("_created")
        . exec((err, posts) => { 
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            // res.json({ posts: posts })
            res.json( posts )
        })
}



const isPoster = (req, res, next) => {

    let sameUser = req.post && req.auth && req.post.postedBy._id == req.auth._id

    console.warn('isPoster RAN')
    // console.warn("req.post: ", req.post)
    // console.warn("req.auth: ", req.auth)
    // console.warn("req.post.postedBy._id: ", req.post.postedBy._id)
    // console.warn("req.auth_id: ", req.auth._id)
    
    if(!sameUser) {
        return res.status(403).json({
            error: "user is not authorized"
        })
    }
    next()
}


// const updatePost = (req, res, next) => {
//     console.warn('UPDATE POST RAN')    
//     let post = req.post
//     post = _.extend(post, req.body)
//     post.updated = Date.now()
//     post.save(err => {
//         if(err) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         res.json(post)
//     })
// }

const updatePost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            });
        }
        // save post
        let post = req.post;
        post = _.extend(post, fields);
        post.updated = Date.now();

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
        }

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(post);
        });
    });
};

const deletePost = (req, res, next) => {
    // console.log('delete post ran')
    let post = req.post
    // console.warn('=======================')
    // console.warn(post)
    // console.warn('=======================')
        post.remove((err, post) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: "Post deleted successfully"
        })
    })
}

const like = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, 
        {$push: {likes: req.body.userId}},
        { new: true}
        ).exec((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result)
            }
        })
}

const unlike = (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, 
        {$pull: {likes: req.body.userId}},
        { new: true}
        ).exec((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            } else {
                res.json(result)
            }
        })
}

const comment = (req, res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId 

    Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: comment }},
        { new: true }
    )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        } else {
            res.json(result)
        }
    })
}

// const uncomment = (req, res) => {

    
//     let comment = req.body.comment
//     console.warn(req.body)

//     Post.findByIdAndUpdate(
//         req.body.postId,
//         { $pull: { comments: {_id: comment._id} }},
//         { new: true }
//     )
//     .populate("comments.postedBy", "_id name")
//     .populate("postedBy", "_id name")
//     .exec((err, result) => {
//         if(err) {
//             return res.status(400).json({
//                 error: err
//             })
//         } else {
//             res.json(result)
//         }
//     })
// }


// const uncomment = (req, res) => {
//     let comment = req.body.comment
//     console.warn(req.body)

//     Post.findByIdAndUpdate(
//         req.body.postId,
//         { $pull: { comments: {_id: comment._id} }},
//         { new: true }
//     )
//     .populate("comments.postedBy", "_id name")
//     .populate("postedBy", "_id name")
//     .exec((err, result) => {
//         if(err) {
//             return res.status(400).json({
//                 error: err
//             })
//         } else {
//             res.json(result)
//         }
//     })
// }

const uncomment = (req, res) => {
    let comment = req.body.comment;

    Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { comments: { _id: comment._id } } },
        { new: true }
    )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        });
};

module.exports = {
    getPosts,
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
}
