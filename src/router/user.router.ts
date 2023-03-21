import userController from 'controller/user.controller';
import validateWithSchema from 'middleware/validateWithSchema.mw';
import {
  changePwdSchema,
  loginSchema,
  registerSchema,
} from 'verify/user.verify';
import CommonRouter from './CommonRouter';

const router = new CommonRouter({
  prefix: '/user',
  unauthorizedInterface: ['/login', '/register'],
});

router.post(
  '/register',
  validateWithSchema(registerSchema),
  userController.register
);

router.post('/login', validateWithSchema(loginSchema), userController.login);

router.post(
  '/changePwd',
  validateWithSchema(changePwdSchema),
  userController.changePwd
);

export default router;
