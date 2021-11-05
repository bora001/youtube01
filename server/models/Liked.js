const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LikedSchema = mongoose.Schema({
    videoId: {
        type: Schema.Types.ObjectId,
        ref:'Video'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    CommentrId: {
        type: Schema.Types.ObjectId,
        ref:'Comment'
    }
}, { timestamps: true })

const Liked = mongoose.model('Liked', LikedSchema)
module.exports = { Liked }