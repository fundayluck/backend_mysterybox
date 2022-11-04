const express = require("express")
const emailController = require('../controllers/email')


const router = express.Router();

router.post('/send-email', emailController.sendEmail)
router.post('/send-subs', emailController.sendSubs)

module.exports = router;