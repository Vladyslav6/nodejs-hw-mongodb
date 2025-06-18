import createHttpError from 'http-errors';
import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contact = await ContactCollection.find();

  return contact;
};

export const getContactsById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};
