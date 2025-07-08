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
export default authRouter;
