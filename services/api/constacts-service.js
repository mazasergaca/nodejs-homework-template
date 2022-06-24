const { Contact } = require("../../models/contacts-model");

const listContacts = async (owner) => {
  return await Contact.find({ owner });
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const removeContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const addContact = async (contact, owner) => {
  return await Contact.create({ ...contact, owner });
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
