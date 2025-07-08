import { model, Schema } from 'mongoose';
import { typeContacts } from '../../constants/typeContact.js';
import { UsersCollection } from './user.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: Object.values(typeContacts),
      required: true,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UsersCollection,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactCollection = model('contact', contactSchema);
