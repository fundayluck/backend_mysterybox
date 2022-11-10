const express = require('express')

const locationController = require('../controllers/location')
const auth = require('../middlewares/requireAuthUser')

const router = express.Router()

router.use(auth)
router.post('/create-location', locationController.createLocation)
router.delete('/delete-location/:LocationId', locationController.deleteLocation)


module.exports = router