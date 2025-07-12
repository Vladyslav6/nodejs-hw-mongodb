import { Router } from 'express';
import {
  loginUserController,
  logoutUserControllers,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';

import { registerValidationUserSchema } from '../validation/registerValidateSchema.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginValidationUserSchema } from '../validation/loginValidateSchema.js';

import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();
//

authRouter.post(
  '/auth/register',
  validateBody(registerValidationUserSchema),
  registerUserController,
);
authRouter.use(
  '/auth/login',
  validateBody(loginValidationUserSchema),
  loginUserController,
);
authRouter.use('/auth/logout', logoutUserControllers);
authRouter.use('/auth/refresh-session', refreshSessionController);

//

authRouter.post(
  '/auth/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

export default authRouter;
