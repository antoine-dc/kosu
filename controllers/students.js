const Student = require("../models/Student")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.createStudent = (req, res, next) => {
  //hachage du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const student = new Student({
        username: req.body.username,
        password: hash,
        droits: req.body.droits,
      })
      //enregistrement de nouveau user dans la bdd
      student
        .save()
        .then(() => res.status(201).json({ message: "Nouvel student enregistré !" }))
        .catch((error) => res.status(401).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
  //recherche utilisateur dans la bdd
  Student.findOne({ username: req.body.username })
    .then((student) => {
      if (!student) {
        return res.status(401).json({ error: "Utilisateur introuvable" })
      }
      //comparaison des hach des mots de passe
      bcrypt
        .compare(req.body.password, student.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe erroné" })
          }
          res.status(200).json({
            //authentification réussie avec userId et encodage token
            username: student.username,
            token: jwt.sign({ username: student.username }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.updateStudent = (req, res, next) => {
  let studentObject = { ...req.body }

  Student.updateOne({ username: req.body.username }, { droits: req.body.droits, _id: req.params.id })
    .then((valid) => {
      if (!valid) {
        return res.status(401).json({ error: "Student introuvable" })
      }

      res.status(200).json({
        message: "Student mise à jour !",
      })
    })

    .catch((error) =>
      res.status(400).json({
        error,
      })
    )
}

exports.deleteStudent = (req, res, next) => {
  Student.findOne({ username: req.body.username })
    .then((student) => {
      Student.deleteOne({ username: req.body.username })
        .then(() => res.status(200).json({ message: "Student supprimée !" }))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.getStudentByUsername = (req, res, next) => {
  Student.findOne({ username: req.params.username })
    .then((student) => {
      res.status(200).json(student)
    })
    .catch((error) => {
      res.status(404).json({ error: error })
    })
}

exports.getStudent = (req, res, next) => {
  const username = req.username
  Student.findOne({ username: username })
    .then((student) => {
      res.status(200).json(student)
    })
    .catch((error) => {
      res.status(404).json({ error: error })
    })
}
