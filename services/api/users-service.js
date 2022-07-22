const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user-model");
const {
  EmailDuplicateError,
  NotAuthorizedError,
  BadRequestError,
  NotFoundError,
} = require("../../helpers/errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async ({ email, password }) => {
  const userByEmail = await User.findOne({ email });
  if (userByEmail) {
    throw new EmailDuplicateError("Email in use");
  }
  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "404" });
  const verificationToken = uuidv4();
  const user = new User({ email, password, avatarURL, verificationToken });
  await user.save();

  const msg = {
    to: email,
    from: process.env.SENGRID_EMAIL,
    subject: "Confirm your email address",
    text: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please, confirm your email address</a>`,
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please, confirm your email address</a>`,
  };
  await sgMail.send(msg);

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

const changesSubscription = async ({ id, subscription }) => {
  const user = await User.findOneAndUpdate(id, { subscription }, { new: true });
  return user;
};

const updateAvatar = async (id, avatarURL) => {
  const user = await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
  return user;
};

const verification = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFoundError("User not found");
  }
  const { _id, email } = user;
  await User.findByIdAndUpdate(_id, {
    verificationToken: null,
    verify: true,
  });

  const msg = {
    to: email,
    from: process.env.SENGRID_EMAIL,
    subject: "Thank you for registration!",
    text: "Thank you for registration.",
    html: "<h1>Thank you for registration.</h1>",
  };
  await sgMail.send(msg);
};

const verify = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotAuthorizedError("Not authorized");
  }

  if (!user.verificationToken) {
    throw new BadRequestError("Verification has already been passed");
  }

  const msg = {
    to: email,
    from: process.env.SENGRID_EMAIL,
    subject: "Confirm your email address",
    text: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please, confirm your email address</a>`,
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Please, confirm your email address</a>`,
  };
  await sgMail.send(msg);
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  changesSubscription,
  updateAvatar,
  verification,
  verify,
};
