const express = require('express')
const router = express.Router();
const { Video } = require('../models/Video')
// const { auth } = require('../middleware/auth');
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')

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
    //client : axios.post - /api/uploads/videos
    //server-index - app.use - /api/uploads
    //router.post - /videos

    router.post('/videos', (req, res) => {
        upload(req, res, err => {
            if (err) {
                return res.json({success : false, err})
            }
            return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
            
        })
    })

    router.post('/thumbnail', (req, res) => {
        console.log(req.body.url)
        let fileDuration;
        let filePath;
        let filename;

        ffmpeg.ffprobe(req.body.url, function (err, metadata) {
            console.log(req.body.url,'url probe')
            fileDuration = metadata.format.duration
            console.log(fileDuration, ' duration')
        })

        ffmpeg(req.body.url)
            .on('filenames', function (filenames) {
                filePath = "uploads/thumbnail/" + filenames[0]
                console.log(filenames,'filenames on filenames')
            })
            .on('end', function () {
                return res.json({ success: true, url: filePath, fileName: filename, fileDuration: fileDuration })
                
            })
            .on('error', function (err) {
                console.error(err);
                return res.json({success:false, err})
                
            })
            .screenshots({
                count: 2,
                folder: 'uploads/thumbnail/',
                size: '320x240',
                filename: 'thumbnail-%b.png'
                // %b : input basename(filename w/o extension)
            })
    })
        
    router.post('/uploadVideo', (req, res) => {
                
        //save the info of video
        const video = new Video(req.body)
        //save at the mongdo db
        video.save((err, doc) => {
            if (err) {
                return res.json({success:false, err})
            }
            res.status(200).json({success:true})
        })
            
    })

router.get('/getvideos', (req, res) => {
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) {
            return res.status(400).send(err)
            }
            res.status(200).json({success:true, videos})
    })
            
})
    

    router.post('/videodetails', (req, res) => {
        Video.findOne({ "_id": req.body.videoId })
            .populate('writer')
            .exec((err, videodetails) => {
                if (err) {
                return res.status(400).send(err)
                }
                return res.status(200).json({success:true, videodetails})
        })
    })


module.exports = router;