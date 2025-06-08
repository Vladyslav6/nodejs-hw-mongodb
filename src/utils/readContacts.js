import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const readContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    // const parsed = JSON.parse(data);
    console.log('Вміст файлу:', data);
  } catch (err) {
    console.error('Помилка читання файлу:', err);
  }
};
