const express = require("express")
const emailController = require('../controllers/email')


const router = express.Router();

router.post('/send-email', emailController.sendEmail)
router.post('/send-subs', emailController.sendSubs)
router.get('/get-send-subs', emailController.getSubs)
router.get('/get-send-email', emailController.getEmail)

module.exports = router;