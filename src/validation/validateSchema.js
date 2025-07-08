import Joi from 'joi';
import { typeContacts } from '../constants/typeContact.js';
import { isValidObjectId } from 'mongoose';

export const validateSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(6).max(20).required(),
  email: Joi.string().min(3).max(20),
  contactType: Joi.string()
    .valid(...Object.values(typeContacts))
    .required(),
  isFavourite: Joi.boolean(),
  userId: Joi.string().custom((value, helper) => {
    if (!isValidObjectId(value)) {
      return helper.message('Not valid mongo objectId');
    }
    return value;
  }),
});
