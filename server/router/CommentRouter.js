const express = require('express')
const router = express.Router();
const { Comment } = require('../models/Comment')

router.post('/saveComment', (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) {
            return res.json({ success: false, err })
        }

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) {
                    return res.json({ success: false, err })
                }
                res.status(200).json({ success: true, result })
            })
    })
})

router.post('/saveReplyComment', (req, res) => {
    console.log(req.body)
    // console.log(req.body.postId)
    Comment.findOneAndUpdate({ _id: req.body.replyTo },
        //push to reply Array
        { $push: { reply: req.body } }
        , (err, reply) => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        }
        return res.status(200).send({
            success: true,
            reply
        })
    })
})

router.post('/getComment', (req, res) => {
    Comment.find({'postId': req.body.videoId})
        .populate('writer')
        .exec((err, comments) => {
            if (err) {
            return res.status(400).send(err)
            }
            res.status(200).json({success:true, comments})
        })

})

router.post('/getReplyComment', (req, res) => {
    Comment.find({ 'postId': req.body.postId})
        .exec((err, replycomments) => {
            if (err) {
            return res.status(400).send(err)
            }
            let replys = replycomments.map(x => x.reply)
            console.log(replys)
            res.status(200).json({success:true, replys})
        })
})


module.exports = router;