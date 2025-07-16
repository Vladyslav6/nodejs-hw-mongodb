import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  updateContacts,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
// import { ContactCollection } from '../db/models/contacts.js';

export const getContactController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filters = req.user._id;
  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',

    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const filters = req.user._id;
  const { contactId } = req.params;
  const contact = await getContactsById(contactId, filters);

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,

    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const filters = req.user._id;
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, filters);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};

export const createContactController = async (req, res) => {
 const photo = req.file;
  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await createContact({
    ...req.body,
    photo: photoUrl,
    userId: req.body.userId ?? req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

// export const createContactController = async (req, res) => {
//   const contact = await createContact({
//     ...req.body,
//     userId: req.body.userId ?? req.user._id,
//   });

//   res.status(201).json({
//     status: 201,
//     message: `Successfully created a contact!`,
//     data: contact,
//   });
// };

// export const patchContactController = async (req, res, next) => {
//   const filters = req.user._id;
//   const { contactId } = req.params;
//   const result = await updateContacts(contactId, req.body, filters);
//   const photo = req.file;

//   if (!result) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched a contact!`,
//     data: result,
//   });
// };

import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const patchContactController = async (req, res, next) => {
  const filters = req.user._id;
  const { contactId } = req.params;

  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContacts(
    contactId,
    {
      ...req.body,
      photo: photoUrl,
    },
    filters,
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result,
  });
};
