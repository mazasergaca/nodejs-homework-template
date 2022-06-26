const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const { User } = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new NotAuthorizedError("Not authorized"));
  }

  const [, token] = authorization.split(" ");

  const { _id } = jwt.decode(token, process.env.JWT_SECRET);

  const user = await User.findById({ _id });

  if (user.token !== token) {
    next(new NotAuthorizedError("Not authorized"));
  }

  req.user = user;
  next();
};

module.exports = {
  authMiddleware,
};
