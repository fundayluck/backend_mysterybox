const express = require('express')

const categoryController = require('../controllers/category')
const auth = require('../middlewares/requireAuthUser')

const router = express.Router()

router.use(auth)
router.post("/create-category", categoryController.createCategory);
router.get("/category", categoryController.getCategory);
router.get("/category/:categoryId", categoryController.getCategoryById);

module.exports = router