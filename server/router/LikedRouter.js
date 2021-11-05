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

     Liked.find({'CommentId': req.body.CommentId})
        .exec((err, comments) => {
            if (err) {
            return res.status(400).send(err)
            }
            res.status(200).json({success:true, comments})
        })

})



module.exports = router;