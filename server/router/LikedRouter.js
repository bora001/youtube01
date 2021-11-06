const express = require('express')
const router = express.Router();
const { Liked } = require('../models/Liked')

router.post('/saveliked', (req, res) => {

    const liked = new Liked(req.body)
    console.log(req.body)

    liked.save((err, likes) => {
        if (err) {
            return res.json({ success: false, err })
        }
        res.status(200).json({ success: true, likes })
    })
})

router.post('/getliked', (req, res) => {

     Liked.find({'CommentId': req.body.CommentId, 'userId':req.body.userId})
        .exec((err, comments) => {
            if (err) {
                return res.status(400).send(err)
            }
            res.status(200).json({success:true, comments})
        })

})

router.post('/removeliked', (req, res) => {

    Liked.findOneAndDelete({
        videoId:req.body.videoId,
        userId:req.body.userId,
        CommentId:req.body.CommentId
    })
    
        .exec((err, unliked) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.status(200).json({success:true, unliked})
        })
})

module.exports = router;