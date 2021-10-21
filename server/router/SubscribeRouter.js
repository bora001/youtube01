const express = require('express')
const router = express.Router();
const { Subscribe } = require('../models/Subscribe')

router.post('/subscribeNum', (req, res) => {
    Subscribe.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if (err) {
            return res.status(400).send(err)
            }
            return res.status(200).json({success:true, subScribeNum : subscribe.length})
    })
})

router.post('/subscribed', (req, res) => {
    Subscribe.find({ 'userTo': req.body.userTo, 'userFrom' :req.body.userFrom })
        .exec((err, subscribe) => {
            if (err) {
            return res.status(400).send(err, req.body.userTo)
            }
            let result = false
            if (subscribe.length !== 0) {
                result = true
            }

            return res.status(200).json({success:true, subscribed : result})
    })
})


router.post('/unsubscribe', (req, res) => {
    Subscribe.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, subscribe) => {
            if (err) {
            return res.status(400).send(err)
            }
            return res.status(200).json({success:true, subscribe})
    })
})


router.post('/subscribe', (req, res) => {
    const subscribe = new Subscribe(req.body)
    subscribe.save((err, doc) => {
       if (err) {
            return res.json({success:false})
            }
            return res.status(200).json({success:true})
    })
})


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