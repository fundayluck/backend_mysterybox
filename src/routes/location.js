const express = require('express')
const upload = require('../../utils/multer1');
const locationController = require('../controllers/location')
const auth = require('../middlewares/requireAuthUser')

const router = express.Router()

router.use(auth)
router.post('/create-location', upload.single("image"), locationController.createLocation)
router.delete('/delete-location/:LocationId', locationController.deleteLocation)


module.exports = router