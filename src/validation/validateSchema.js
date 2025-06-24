import Joi from 'joi';
import { typeContacts } from '../constants/typeContact.js';

export const validateSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(6).max(20).required(),
  email: Joi.string().min(3).max(20),
  contactType: Joi.string()
    .valid(...Object.values(typeContacts))
    .required(),
  isFavourite: Joi.boolean(),
});
