const express = require("express")


const userController = require('../controllers/user')


const router = express.Router();

router.post("/signin", userController.user);
router.get('/user', userController.getAllUser)
router.get('/user/:userId', userController.getAllById)
router.post('/user/create', userController.createUser)
router.delete('/user/delete/:adminId', userController.deleteUser)

module.exports = router;