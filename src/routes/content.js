const express = require('express')
const { body } = require('express-validator')

const contentController = require('../controllers/content')
const auth = require('../middlewares/requireAuthUser')

const router = express.Router()

router.use(auth)
router.post("/create-content", [
    body('id_category').isLength({ min: 1 }).withMessage('kesalahan pada id_category'),
], contentController.createContent);
router.delete("/delete-content/:ContentId", contentController.deleteContent);
router.get("/content", contentController.getContent);



module.exports = router