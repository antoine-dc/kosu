const Student = require("../models/Student")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.createStudent = (req, res, next) => {
  delete req.body._id

  const employee = new Student({
    ...req.body,
  })

  employee
    .save()
    .then(() => res.status(201).json({ message: "employee created" }))
    .catch((err) => res.status(400).json({ err }))
}

exports.signup = (req, res, next) => {
  //hachage du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const student = new Student({
        username: req.body.username,
        password: hash,
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
            userId: student._id,
            token: jwt.sign({ userId: student._id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
          })
        })
        .catch((error) => res.status(500).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.updateStudent = (req, res, next) => {
  let studentObject = { ...req.body }

  Student.updateOne({ username: req.body.username }, { ...req.body, _id: req.params.id })
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
