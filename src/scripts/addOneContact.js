import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import fs from 'node:fs/promises';
import { writeContacts } from '../utils/writeContacts.js';

export const addOneContact = async () => {
  const data = createFakeContact();
  writeContacts(data);
  //   const data = createFakeContact();
  //   const allData = await fs.readFile(PATH_DB, 'utf8');
  //   const newData = JSON.parse(allData);
  //   newData.push(data);
  //   try {
  //     await fs.writeFile(PATH_DB, JSON.stringify(newData, null, 2), 'utf8');
  //     console.log('Дані успішно додані до файлу.');
  //   } catch (err) {
  //     console.error('Помилка додавання даних до файлу:', err);
  //   }
};

addOneContact();
