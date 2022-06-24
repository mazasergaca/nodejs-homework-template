const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user-model");
const {
  EmailDuplicateError,
  NotAuthorizedError,
} = require("../../helpers/errors");

const registration = async ({ email, password }) => {
  const userByEmail = await User.findOne({ email });
  if (userByEmail) {
    throw new EmailDuplicateError("Email in use");
  }

  const user = new User({ email, password });
  await user.save();

  return user;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  return updatedUser;
};

const logout = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }

  return await User.findByIdAndUpdate(id, { token: null });
};

const currentUser = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }

  return user;
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
};
