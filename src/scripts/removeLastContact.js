import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';


export const removeLastContact = async () => {

    try {
          const fileData = await fs.readFile(PATH_DB, 'utf8');
          const contacts = JSON.parse(fileData);
          const popContact= contacts.pop();
    
          //
          await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf8');
          console.log('Останній контакт успішно видалений', PATH_DB);
        } catch (err) {
          console.error('Помилка запису у файл:', err);
        }
      
};

removeLastContact();
