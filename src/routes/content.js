const express = require('express')

const contentController = require('../controllers/content')
const auth = require('../middlewares/requireAuthUser')

const router = express.Router()

router.use(auth)
router.post("/create-content", contentController.createContent);
router.delete("/delete-content/:ContentId", contentController.deleteContent);
router.get("/content", contentController.getContent);



module.exports = router