const express = require("express")
const auth = require("../middleware/auth")
const router = express.Router()

const studentsCtrl = require("../controllers/students")

router.post("/", studentsCtrl.createStudent)
router.get("/getByUsername/:username", auth, studentsCtrl.getStudentByUsername)
router.get("/", auth, studentsCtrl.getStudent)
router.post("/login", studentsCtrl.login)
router.put("/", auth, studentsCtrl.updateStudent)
router.delete("/", auth, studentsCtrl.deleteStudent)

module.exports = router
