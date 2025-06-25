import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateSchema } from '../validation/validateSchema.js';
import { updateValidateSchema } from '../validation/updateValidateSchema.js';

const contactRouter = Router();

contactRouter.use('/contacts/:contactId', isValidId('contactId'));

contactRouter.get('/contacts', ctrlWrapper(getContactController));
contactRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);
contactRouter.post(
  '/contacts',
  validateBody(validateSchema),
  ctrlWrapper(createContactController),
);
contactRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

// contactRouter.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

contactRouter.patch(
  '/contacts/:contactId',
  validateBody(updateValidateSchema),
  ctrlWrapper(patchContactController),
);

export default contactRouter;
