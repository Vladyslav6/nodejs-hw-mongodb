import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const writeContacts = async (updatedContacts) => {
  {
    // const data = updatedContacts;
    // console.log('writeContact ', data);

    try {
      const fileData = await fs.readFile(PATH_DB, 'utf8');
      const contacts = JSON.parse(fileData);
      contacts.push(updatedContacts);

      //
      await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf8');
      console.log('Дані успішно записані у файл.', PATH_DB);
    } catch (err) {
      console.error('Помилка запису у файл:', err);
    }
  }
};
