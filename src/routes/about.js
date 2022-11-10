const express = require('express')

const aboutController = require('../controllers/about')
const auth = require('../middlewares/requireAuthUser')

const router = express.Router()

router.use(auth)
router.post('/create-aboutus', aboutController.create)
router.put('/edit-aboutus/AboutusId', aboutController.edit)
router.get('/aboutus', aboutController.get)

module.exports = router