const express = require('express')
const router = express.Router();

// const { Videos } = require('../models/Video')
// const { auth } = require('../middleware/auth');
const multer = require('multer')

    let storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "uploads/")
        },
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}_${file.originalname}`)
        },
        fileFilter: (req, file, callback) => {
            const ext = path.extname(file.originalname)
            if (ext !== '.mp4') {
                return callback(res.status(400).end('Please upload only mp4 files'), false)
            }
            callback(null, true)
        }

    });

    const upload = multer({ storage: storage }).single("file")
    //client : axios.post - /api/upload/videos
    //server-index - app.use - /api/upload
    //router.post - /videos
    
    router.post('/videos', (req, res) => {
        upload(req, res, err => {
            if (err) {
                return res.json({success : false, err})
            }
            return res.json({ success: true, url: res.req.file.path, filename: res.req.file.filename })
            
        })
    })

module.exports = router;