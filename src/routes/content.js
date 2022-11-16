const express = require('express')
const upload = require('../../utils/multer1');
const contentController = require('../controllers/content')
const auth = require('../middlewares/requireAuthUser')

const router = express.Router()

router.use(auth)
router.post("/create-content", upload.single("image"), contentController.createContent);
router.post("/create-youtube", contentController.createYoutube);
router.put("/edit-content/:contentId", contentController.editContent);
router.put("/edit-status/:contentId", contentController.editStatus);
router.delete("/delete-content/:ContentId", contentController.deleteContent);
router.get("/content", contentController.getContent);
router.get("/content/:contentId", contentController.getContentById);



module.exports = router