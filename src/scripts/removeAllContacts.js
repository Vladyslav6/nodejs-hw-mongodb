import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';



export const removeAllContacts = async () => {
        const contacts = ([]);
    try {
      await fs.writeFile(PATH_DB, JSON.stringify(contacts), 'utf8');
      console.log('Дані успішно записані у файл.', PATH_DB);
    } catch (err) {
      console.error('Помилка запису у файл:', err);
    }
};

removeAllContacts();
