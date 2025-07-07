import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { SessionCollection } from '../db/models/session.js';

export const registerUser = async (payload) => {
  const exsistUser = await UsersCollection.findOne({ email: payload.email });
  if (exsistUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UsersCollection.create({
    ...payload,
    password: hashedPassword,
  });
  return user;
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }
  const arePasswordsEquel = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!arePasswordsEquel) {
    throw createHttpError(401, 'Wrong password');
  }

  await SessionCollection.findOneAndDelete({
    userId: user._id,
  });

  const session = await SessionCollection.create({
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
    refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    userId: user._id,
  });

  return session;
};
