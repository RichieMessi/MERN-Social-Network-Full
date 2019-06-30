const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

// const postSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: "Title is required",
//         minlength: 4,
//         maxlength: 150
//     },
//     body: {
//         type: String,
//         required: "Body is required",
//         minlength: 4,
//         maxlength: 1000
//     }
// })


const modelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photos: {
        type: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{type: ObjectId, ref: "User"}],
    comments: [
        {
            text: String,
            created: {type: Date, default: Date.now},
            postedBy: {type: ObjectId, ref: "User"}
        }
    ],
    photo: {
        data: Buffer,
        contentType: String
    },
})
const modelName = 'Post'
module.exports = mongoose.model(modelName, modelSchema)




