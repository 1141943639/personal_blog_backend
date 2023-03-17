import Router from 'koa-router';
import validTokenMw from 'middleware/validToken.mw';
import { CommonRouterOpt } from 'types/router/CommonRouterProps';

export default class CommonRouter extends Router {
  constructor(opt?: CommonRouterOpt) {
    super(opt);

    // 通用中间件
    super.use(validTokenMw(opt));
  }
}
