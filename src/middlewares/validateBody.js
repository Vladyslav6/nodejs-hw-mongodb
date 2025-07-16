export const validateBody = (schema) => async (req, res, next) => {
  await schema.validateAsync(req.body, {
    abortEarly: false,
    convert: true,
    // convert: false,
  //замінив
    allowUnknown: false,
  });
  next();
};
