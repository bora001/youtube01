const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscribeSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    userFrom: {
        // type: Schema.Types.ObjectId,
        type:String,
        ref:'User'
    },
    filePath: {
            type:String
    },
    videos: {
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
    }
}, { timestamps: true })

// SubscribeSchema.pre('save', function (next) {
//     var user = this;
//         if(user.isModified('password')){
//             bcrypt.genSalt(saltRounds, function (err, salt) {
//                 if(err) return next(err)
                
//                 bcrypt.hash(user.password, salt, function (err, hash) {
//                     if (err) return next(err)
//                     user.password = hash
//                     next()
//                 })
//             })
//         }
        
//         else {
//             next()
//         }
// })

const Subscribe = mongoose.model('Subscribe', SubscribeSchema)
module.exports = { Subscribe }