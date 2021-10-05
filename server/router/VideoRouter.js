const express = require('express')
const router = express.Router();

// const { Videos } = require('../models/Video')
// const { auth } = require('../middleware/auth');
const multer = require('multer')

    let storage = multer.diskStorage({
        //file go to uploads folder
        destination: (req, file, callback) => {
            callback(null, "uploads/")
        },
        //filename setting
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}_${file.originalname}`)
        }

    });

    const fileFilter = (req, file, callback) => {
        if (file.mimetype !== 'video/mp4') {
            return callback({ msg: 'Please upload only mp4 files' }, false)
        }
        console.log(file.mimetype,"type")
        callback(null, true)
    }


    const upload = multer({ storage: storage, fileFilter: fileFilter }).single("file")
    //client : axios.post - /api/upload/videos
    //server-index - app.use - /api/upload
    //router.post - /videos

    router.post('/videos', (req, res) => {
        upload(req, res, err => {
            if (err) {
                return res.json({success : false, err})
            }
            return res.json({ success: true, url: res.req.file.path, filename: res.req.file.filename, file })
            
        })
    })

module.exports = router;