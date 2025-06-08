import { faker } from '@faker-js/faker';
import { createFakeContact } from '../utils/createFakeContact.js';
import { writeContacts } from '../utils/writeContacts.js';

const generateContacts = async (number) => {
  // console.log(typeof fakeNumber);
  // console.log(JSON.stringify(fakeNumber));
  // writeContacts(Buffer.from(JSON.stringify(fakeNumber)));
  // const fakeNumber = createFakeContact(number);
  for (let i = 1; i<=number; i++){
    await writeContacts(createFakeContact());
    // console.log(writeContacts);
  };
//
//   const users = faker.helpers.multiple(createFakeContact, {
//     count: number,
//   });
//   console.log(users);
//   writeContacts(users);
  //
  // for (let i = 1; i <= number; i++) {
  //   const fakeNumber = createFakeContact();
  //   // writeContacts(JSON.stringify(fakeNumber));
  //   writeContacts(fakeNumber);
  //   // console.log(fakeNumber);
  //   // console.log(JSON.stringify(fakeNumber));
  //   // const parseFile = JSON.stringify(fakeNumber);
  //   // console.log(JSON.parse(parseFile));
  // }
};

generateContacts(5);
