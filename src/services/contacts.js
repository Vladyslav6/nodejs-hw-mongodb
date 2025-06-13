// src/services/students.js 
import { Contact } from '../db/models/contacts.js';


export const getAllStudents = async () => {
  const students = await Contact.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await Contact.findById(studentId);
  return student;
};
