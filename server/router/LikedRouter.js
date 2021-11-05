const express = require('express')
const router = express.Router();
const { Liked } = require('../models/Liked')

    // api / liked
router.post('/likedcomment', (req, res) => {

    const liked = new Liked(req.body)
    console.log(req.body)

    liked.save((err, likes) => {
        if (err) {
            return res.json({ success: false, err })
        }
        res.status(200).json({ success: true, likes })
    })

})

module.exports = router;