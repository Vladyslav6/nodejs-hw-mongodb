import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { SessionCollection } from '../db/models/session.js';

const createSession = () => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
});

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
    ...createSession(),
    userId: user._id,
  });

  return session;
};

export const logoutUser = async (SessionToken, SessionId) => {
  await SessionCollection.findOneAndDelete({
    _id: SessionId,
    refreshToken: SessionToken,
  });
};

export const refreshSession = async (SessionId, SessionToken) => {
  const session = await SessionCollection.findOne({
    _id: SessionId,
    refreshToken: SessionToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await SessionCollection.findByIdAndDelete(SessionId);
    throw createHttpError(401, 'Session expired');
  }

  await SessionCollection.findByIdAndDelete(SessionId);

  const CreateNewSession = await SessionCollection.create({
    ...createSession(),
    userId: session.userId,
  });

  return CreateNewSession;
};

//

import jwt from 'jsonwebtoken';

import { SMTP, TEMPLATES_DIR } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendEmail } from '../utils/sendMail.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVar('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${getEnvVar('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: getEnvVar(SMTP.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (err) {
    console.error('Error sending reset email:', err);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

//

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error)
      throw createHttpError(401, err.message, 'Token is expired or invalid.');
    throw err;
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
