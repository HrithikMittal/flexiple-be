const jwt = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ message: "You are not authorized", success: false });
  }
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ message: "You are not authorized", success: false });
  }

  next();
};

module.exports = authCheck;
