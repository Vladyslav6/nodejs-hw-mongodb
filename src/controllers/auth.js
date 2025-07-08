import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.js';

const setupSessionCookies = (session, res) => {
  res.cookie('SessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('SessionToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerUserController = async (req, res) => {
  const session = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: session,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSessionCookies(session, res);
  res.json({
    status: 200,
    message: 'Successfully login in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserControllers = async (req, res) => {
  const { SessionToken, SessionId } = req.cookies;
  await logoutUser(SessionToken, SessionId);

  res.clearCookie('SessionToken');
  res.clearCookie('SessionId');

  res.status(204).send();
};

export const refreshSessionController = async (req, res) => {
  const { SessionToken, SessionId } = req.cookies;
  const session = await refreshSession(SessionId, SessionToken);

  setupSessionCookies(session, res);

  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
