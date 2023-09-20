const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")
const sauceCtrl = require("../controllers/sauce")

router.get("/", sauceCtrl.getAllSauces)
router.get("/:id", auth, sauceCtrl.getOneSauce)
router.post("/", multer, sauceCtrl.createSauce)
router.put("/:id", auth, multer, sauceCtrl.updateSauce)
router.delete("/:id", auth, sauceCtrl.deleteSauce)
router.post("/:id/like", auth, sauceCtrl.likeSauce)

module.exports = router
