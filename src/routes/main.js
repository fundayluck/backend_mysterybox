const express = require("express")


const contentController = require('../controllers/content')


const router = express.Router();

router.get("/main-content", contentController.getContent);

module.exports = router;