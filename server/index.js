const express = require('express')
const app = express()
const path = require('path');
// const port = 5000
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const { auth } = require("./middleware/auth")
const { User } = require("./models/User")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

//video
//client : axios.post - /api/upload/videos
//server-index - app.use - /api/upload
//  connected router
app.use('/api/uploads', require('./router/VideoRouter'))
app.use('/api/subscribe', require('./router/SubscribeRouter'))
app.use('/api/comment', require('./router/CommentRouter'))



app.use('/uploads/',express.static('uploads'))
    

const mongoose = require('mongoose')
mongoose.connect(config.mongoUrl, {
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>console.log("MongoDB is connected....")).catch(err=>console.log(err))

//client-axios
app.get('/api/hello', (req, res) => {
    res.send("axiossssss")
})

app.post('/api/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/login', (req, res) => {
    
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message:"We can not find the email"
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "incorrect Password"
                })
            
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).send(err, "index generateToken error");
                }
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

app.get('/api/auth', auth, (req, res) => {

    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image:req.user.image
    })
})

app.get('/api/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: '' }
        , (err, user) => {
        if (err) {
                return res.json({
                    success: false,
                    err
                })
            }
        return res.status(200).send({
            success:true
        })
    })
})


if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname,"../client","build","index.html"))
    })
}

// const port = process.env.PORT || 5000
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`localhost:${port}`))
