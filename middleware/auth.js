const jwt = require("jsonwebtoken")

//implémentation token d'authentification
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET")
    const username = decodedToken.username
    if (req.body.username && req.body.username !== username) {
      throw "User ID non valable"
    } else {
      req.username = username
      next()
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" })
  }
}
