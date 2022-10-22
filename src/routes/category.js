const express = require('express')

const categoryController = require('../controllers/category')

const router = express.Router()

router.get("/category", categoryController.getCategory);
router.get("/category/:categoryId", categoryController.getCategoryById);

module.exports = router