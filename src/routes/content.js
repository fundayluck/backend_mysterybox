const express = require('express')

const contentController = require('../controllers/content')

const router = express.Router()

router.post("/create-content", contentController.createContent);
router.delete("/delete-content/:ContentId", contentController.deleteContent);
router.get("/content", contentController.getContent);



module.exports = router