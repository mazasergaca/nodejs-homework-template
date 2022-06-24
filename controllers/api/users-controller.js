const {
  registration,
  login,
  logout,
  currentUser,
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

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
};
