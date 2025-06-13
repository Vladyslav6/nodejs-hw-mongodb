// src/services/students.js 
import { ContactCollection } from '../db/models/contacts.js';


export const getAllStudents = async () => {
  const contact = await ContactCollection.find();
  return contact;
};

export const getStudentById = async (contactId) => {
  const contact = await ContactCollection.findById(contactId);
  return contact;
};
