const express = require('express')
const router = express.Router();
const { Subscribe } = require('../models/Subscribe')

router.post('/api/subscribe/', (req, res) => {
    Subscribe.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if (err) {
            return res.status(400).send(err)
            }
            return res.status(200).json({success:true, subScribeNum : subscribe.length})
    })
    })


module.exports = router;