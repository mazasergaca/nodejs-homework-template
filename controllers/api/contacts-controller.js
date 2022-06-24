const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../services/api/constacts-service");

const listContactsController = async (req, res) => {
  const { _id } = req.user;

  const contacts = await listContacts(_id);

  return res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  return contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  return contact
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
};

const addContactController = async (req, res) => {
  const { _id } = req.user;

  const contact = await addContact(req.body, _id);

  return res.status(201).json(contact);
};

const updateContactController = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { contactId } = req.params;

  const contact = await updateContact(contactId, req.body);

  return res.status(200).json(contact);
};

const updateStatusContactController = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const { contactId } = req.params;

  const updateContact = await updateStatusContact(contactId, req.body);

  return updateContact
    ? res.status(200).json(updateContact)
    : res.status(404).json({ message: "Not found" });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController,
};
