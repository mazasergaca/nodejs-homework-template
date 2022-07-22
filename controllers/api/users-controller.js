const fs = require("fs").promises;
const path = require("path");
const {
  registration,
  login,
  logout,
  currentUser,
  changesSubscription,
  updateAvatar,
} = require("../../services/api/users-service");
const { getResizeAvatar } = require("../../helpers/resize-avatar");

const registrationController = async (req, res) => {
  const { email, password } = req.body;

  const user = await registration({ email, password });

  return res
    .status(201)
    .json({ user: { email: user.email, subscription: user.subscription } });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await login({ email, password });

  return res.status(200).json({
    token: user.token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logoutController = async (req, res) => {
  const { _id } = req.user;

  await logout(_id);

  return res.status(204).json();
};

const currentUserController = async (req, res) => {
  const { _id } = req.user;

  const user = await currentUser(_id);

  return res
    .status(200)
    .json({ user: { email: user.email, subscription: user.subscription } });
};

const changesSubscriptionController = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    return res.status(400).json({ message: "invalid subscription type" });
  }

  const user = await changesSubscription({ _id, subscription });

  return res.status(200).json(user);
};

const updateAvatarController = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const imageName = `${_id}_${originalname}`;
  await getResizeAvatar(tempUpload);

  try {
    const resultUpload = path.join(path.resolve("./public/avatars"), imageName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", imageName);

    const user = await updateAvatar(_id, avatarURL);
    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    return next(error);
  }

  res.status(200);
};

const verificationController = async (req, res, next) => {
  const { verificationToken } = req.params;

  await verification(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

const verifyController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }

  await verify(email);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changesSubscriptionController,
  updateAvatarController,
  verificationController,
  verifyController,
};
