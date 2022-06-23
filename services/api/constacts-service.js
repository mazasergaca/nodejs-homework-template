const { Contact } = require("../../models/contacts-model");

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const removeContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const addContact = async (contact) => {
  return await Contact.create(contact);
};

const updateContact = async (id, contact) => {
  return await Contact.findByIdAndUpdate(id, contact, {
    new: true,
  });
};

const updateStatusContact = async (id, contact) => {
  return await Contact.findByIdAndUpdate(id, contact, { new: true });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
