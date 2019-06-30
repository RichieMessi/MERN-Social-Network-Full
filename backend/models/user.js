const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')
const crypto = require('crypto')
const { ObjectId}  = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    bio: {
        type: String,
        trim: true
    },
    following: [{type: ObjectId, ref: "User"}],
    followers: [{type: ObjectId, ref: "User"}]
})


// ================================================== 
// VIRTUAL FIELD STARTS

// const createTemporaryPassword = (password) => {

//     this._password = password
//     // generate a timestamp
//     this.salt = uuidv1()
//     // encrypt password
//     this.hashed_password = this.encryptPassword(password)
// }

// const getTemporaryPassword  = () => this._password

userSchema.virtual('password')
.set(function(password) {
    this._password = password
    // generate a timestamp
    this.salt = uuidv1()
    // encrypt password
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password;
})

// methods
userSchema.methods = {

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                            .update(password)
                            .digest('hex')
        } catch(err) {
            return "";
        }
    }
}

// VIRTUAL FIELD ENDS
// ================================================== 


const modelName = 'User';

module.exports = mongoose.model(modelName, userSchema);