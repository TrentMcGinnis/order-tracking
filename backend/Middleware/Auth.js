const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SIGN.toString());
    req.userData = {email: decodedToken.email, id: decodedToken.userid};
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated."
    })
  }
};
