import Joi from 'joi';
import { typeContacts } from '../constants/typeContact.js';

export const updateValidateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(6).max(20),
  email: Joi.string().min(3).max(20),
  contactType: Joi.string().valid(...Object.values(typeContacts)),
  isFavourite: Joi.boolean(),
  // photo: Joi.string(),
});
