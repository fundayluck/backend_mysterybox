const express = require("express")


const contentController = require('../controllers/content')
const locationController = require('../controllers/location')

const router = express.Router();

router.get("/main-content", contentController.getContent);
router.get('/location', locationController.getLocation)

module.exports = router;