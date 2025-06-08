import path from 'node:path';
import { PATH_DB } from './constants/contacts.js';
import fs from 'node:fs';
import { readContacts } from './utils/readContacts.js';
import { createFakeContact } from './utils/createFakeContact.js';

const testHello = 'Hello, World!';
console.log(testHello);
// console.log(readContacts());
const readData = readContacts();
console.log(readData);
// console.log(createFakeContact(2));
