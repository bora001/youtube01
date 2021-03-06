const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        //to get Userinfo from the UserSchema
        ref:'User'
    },
    title: {
        type: String,
        maxlength:50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
        //0 true, 1 false
    },
    filePath: {
        type:String
    },
    category: {
        type:String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type:String
    },
    thumbnail: {
        type:String 
    }

}, {timestamps:true})


const Video = mongoose.model('Video', videoSchema)
module.exports = { Video }