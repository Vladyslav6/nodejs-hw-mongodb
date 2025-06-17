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
