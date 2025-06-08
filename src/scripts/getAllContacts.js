import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';
import { readContacts } from '../utils/readContacts.js';

export const getAllContacts = async () => {
  // const allDataFile = readContacts();
  

    try {
      const data = await fs.readFile(PATH_DB, 'utf8');
      const ParseDate = JSON.parse(data);
      
      // const parsed = JSON.parse(data);
   
      console.log('Вміст файлу:', ParseDate);
    } catch (err) {
      console.error('Помилка читання файлу:', err);
    }
  // console.log(typeof allDataFile);
  // console.log(allDataFile);
// let count = 0;
  // const mapAllContacts = getAllContacts.map((item)=>{count+1});
// for (let count in allDataFile){
//   count+=1;
//   console.log('dd',count);
// }
  // console.log(mapAllContacts);
  //  console.log(count);
  // for (let i=0;i<=allDataFile;i++){
  //   count +=1;
  //   console.log(count);
  // };
  //
  //   try {
  //     const files = await fs.readdir(PATH_DB);
  //     console.log('Список файлів і каталогів:', files);
  //   } catch (err) {
  //     console.error('Помилка отримання списку файлів і каталогів:', err);
  //   }
};

console.log(await getAllContacts());
