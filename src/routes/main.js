const express = require("express")


const contentController = require('../controllers/content')
const locationController = require('../controllers/location')
const aboutController = require('../controllers/about')

const router = express.Router();

router.get("/main-content", contentController.getContent);
router.get('/location', locationController.getLocation)
router.get('/aboutus-main', aboutController.get)

module.exports = router;