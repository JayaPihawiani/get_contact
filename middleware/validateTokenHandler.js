const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCES_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User not authorized");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Token not provided");
  }
});

module.exports = validateToken;
