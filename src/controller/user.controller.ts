import { IMiddleware } from 'koa-router';

class UserController {
  register: IMiddleware = (ctx, next) => {};
}

export default new UserController();
