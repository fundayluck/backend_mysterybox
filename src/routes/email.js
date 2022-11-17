const express = require("express")
const emailController = require('../controllers/email')
const upload = require('../../utils/multer');


const router = express.Router();

router.post('/send-email', upload.single("asset"), emailController.sendEmail)
router.post('/send-email-without-attach', emailController.sendEmailWithoutAttach)
router.post('/send-subs', emailController.sendSubs)
router.get('/get-send-subs', emailController.getSubs)
router.get('/get-send-email', emailController.getEmail)

module.exports = router;