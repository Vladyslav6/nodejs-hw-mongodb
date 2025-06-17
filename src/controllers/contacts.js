import { getAllContacts, getContactsById } from '../services/contacts.js';

export const getContactController = async (req, res, next) => {
  const data = await getAllContacts();

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',

    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);

  // if (!contact) {
  //   return res.status(404).json({
  //     message: `Contact not found`,
  //   });
  // }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,

    data: contact,
  });
};
