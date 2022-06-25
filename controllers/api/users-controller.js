const {
  registration,
  login,
  logout,
  currentUser,
  changesSubscription,
} = require("../../services/api/users-service");

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

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changesSubscriptionController,
};
