const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscribeSchema = mongoose.Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref:'User'
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