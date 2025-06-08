import fs from 'node:fs/promises';
import { PATH_DB } from '../constants/contacts.js';

//
export const countContacts = async () => {
  try {
        const data = await fs.readFile(PATH_DB, 'utf8');
        const ParseDate = JSON.parse(data);
     
        console.log('Вміст файлу:', ParseDate.length, ': контактів');
      } catch (err) {
        console.error('Помилка читання файлу:', err);
      }
};

console.log(await countContacts());
