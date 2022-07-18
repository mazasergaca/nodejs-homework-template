const express = require("express");
const { asyncWrapper } = require("../../helpers/api-helpers");
const { validationUser } = require("../../middlewares/validation-middleware");
const { authMiddleware } = require("../../middlewares/auth-middleware");
const { uploadMiddleware } = require("../../middlewares/upload-middlewar");
const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changesSubscriptionController,
  updateAvatarController,
} = require("../../controllers/api/users-controller");

const router = express.Router();

// new user registration
router.post("/signup", validationUser, asyncWrapper(registrationController));
// user login
router.post("/login", validationUser, asyncWrapper(loginController));
// user logout
router.get("/logout", authMiddleware, asyncWrapper(logoutController));
// get current user
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
// changes subscription user
router.patch("/", authMiddleware, asyncWrapper(changesSubscriptionController));
// uploads an avatar
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  asyncWrapper(updateAvatarController)
);

module.exports = router;
