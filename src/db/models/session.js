import { model, Schema, Types } from 'mongoose';
import { UsersCollection } from './user.js';

const sessionSchema = new Schema(
  {
    // userId: {
    //   type: String,
    //   required: true,
    // },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: UsersCollection,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SessionCollection = model('Session', sessionSchema);
