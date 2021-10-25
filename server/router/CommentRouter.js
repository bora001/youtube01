const express = require('express')
const router = express.Router();
const { Comment } = require('../models/Comment')

router.post('/saveComment', (req, res) => {
    console.log(req.body)
    const comment = new Comment(req.body)
    comment.save((err, comment) => {
        if (err) {
            return res.json({success:false, err})
        }
        // comment.find({ '.id': comment._id })
        //     .polulate('writer')
        //     .exec((err, result) => {
        //             if (err) {
        //             return res.json({success:false, err})
        //             }
        //             res.status(200).json({success:true, result})
        //     })
    })
    // Subscribe.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom, filePath : req.body.filePath})
    //     .exec((err, subscribe) => {
    //         if (err) {
    //         return res.status(400).send(err)
    //         }
    //         return res.status(200).json({success:true, subscribe})
    // })
})


// router.post('/subscribe', (req, res) => {
//     const subscribe = new Subscribe(req.body)
    
//     subscribe.save((err, doc) => {
//        if (err) {
//             return res.json({success:false})
//             }
//             return res.status(200).json({success:true})
//     })
// })


router.get('/subscription', (req, res) => {
    Subscribe
        .find({ userFrom: req.cookies.x_auth })
        .exec((err, videos) => {
            if (err) {
            return res.status(400).send(err)
            }
            console.log(videos)
            res.status(200).json({success:true, videos})
    })
            
})


module.exports = router;