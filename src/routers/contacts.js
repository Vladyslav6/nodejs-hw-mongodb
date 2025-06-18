import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactController));

contactRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);
contactRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

contactRouter.post('/students', createContactController);
export default contactRouter;
