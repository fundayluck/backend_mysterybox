require('./models/category')
require('./models/content')
require('./models/user')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const user = require('./routes/user')
const auth = require('./middlewares/requireAuthUser')
const content = require('./routes/content')
const category = require('./routes/category')



const app = express()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toString() + '-' + file.originalname)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(cors())
app.use(bodyParser.json())
app.use(user)
app.use(content)
app.use(category)




const mongoUrl =
    'mongodb+srv://mysteryboxindo:Honginterna$ional1010@mysterybox.lglrjch.mongodb.net/test'
mongoose.connect(mongoUrl)
mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
    console.error('error connecting to mongo', err)
})

app.get('/', auth, function (req, res) {
    res.send('hello world!')
})

app.listen(3000, function () {
    console.log('server is live')
})