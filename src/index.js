require('./models/category')
require('./models/content')
require('./models/user')
require('./models/role')
require('./models/pic')
require('./models/subs')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const user = require('./routes/user')
const auth = require('./middlewares/requireAuthUser')
const content = require('./routes/content')
const category = require('./routes/category')
const email = require('./routes/email')
const main = require('./routes/main')

const app = express()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    },

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

const maxSize = 20 * 1024 * 1024

app.use(cors())
app.use(bodyParser.json())
app.use('/images', express.static('images'));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter, limits: { fileSize: maxSize } }).single('image'))
app.use(email)
app.use(main)
app.use(user)
app.use(content)
app.use(category)

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message: message, data: data })
})

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