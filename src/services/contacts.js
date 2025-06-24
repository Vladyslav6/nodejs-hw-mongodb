import createHttpError from 'http-errors';
import { ContactCollection } from '../db/models/contacts.js';

export const getAllContacts = async ({ page, perPage }) => {
  const pageSkip = (page - 1) * perPage;
  const contact = await ContactCollection.find().skip(pageSkip).limit(perPage);

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

export const updateContacts = async (contactId, payload) => {
  const contact = await ContactCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
    },
  );

  if (!contact) {
    throw createHttpError(404, 'Contact not found2');
  }

  return contact;
};
