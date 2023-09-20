const express = require("express")

const router = express.Router()

const studentsCtrl = require("../controllers/students")

router.post("/", studentsCtrl.createStudent)

router.post("/signup", studentsCtrl.signup)
router.post("/login", studentsCtrl.login)
router.put("/", studentsCtrl.updateStudent)
router.delete("/", studentsCtrl.deleteStudent)

module.exports = router
