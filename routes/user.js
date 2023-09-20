const express = require("express")
const router = express.Router()
const userCtrl = require("./../controllers/user")

router.get("/home", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  })
})
router.post("/signup", userCtrl.signup)
router.post("/login", userCtrl.login)

module.exports = router
