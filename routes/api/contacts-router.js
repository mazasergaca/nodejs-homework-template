const express = require("express");
const { asyncWrapper } = require("../../helpers/api-helpers");
const {
  validationContact,
} = require("../../middlewares/validation-middleware");
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/api/contacts-controller.js");

const router = express.Router();

// get all contacts
router.get("/", asyncWrapper(listContactsController));
// get contact by id
router.get("/:contactId", asyncWrapper(getContactByIdController));
// add contact
router.post("/", validationContact, asyncWrapper(addContactController));
// delete contact
router.delete("/:contactId", asyncWrapper(removeContactController));
// update contact
router.put(
  "/:contactId",
  validationContact,
  asyncWrapper(updateContactController)
);
//changes favorite value
router.patch(
  "/:contactId/favorite",
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
