import createHttpError from 'http-errors';
import { ContactCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/sort.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filters,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollection.find();

  if (filters) {
    contactQuery.where('userId').equals(filters);
  }
  const contactCount = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  const contact = await contactQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contact,
    ...paginationData,
  };
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
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};
