import createError from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  const error = createError(404, 'Route not found');
  res.status(error.status).json({ message: error.message });
};
