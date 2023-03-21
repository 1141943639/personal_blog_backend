import { IMiddleware } from 'koa-router';
import { CommonRouterOpt } from 'types/router/CommonRouterProps';
import { some } from 'lodash';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import configDefault from 'config/config.default';
import { CommonErrorRes } from 'common/CommonResponse';

/**
 * 验证token的中间件
 * @param opt
 * @returns
 */
const validTokenMw: (opt?: CommonRouterOpt) => IMiddleware =
  (opt) => async (ctx, next) => {
    const { req } = ctx;

    if (opt?.unauthorizedInterface === '*') return await next();

    const matchRouterPath = opt?.unauthorizedInterface?.map((path) => ({
      path: [opt.prefix, path].join(''),
    }));

    if (some(matchRouterPath, { path: req.url })) return await next();
    try {
      const user = jwt.verify(
        ctx.request.header.authorization || '',
        configDefault.JWT_SECRET
      );

      ctx.state.user = user;
    } catch (e) {
      const err = e as Error;
      const errMsg = (() => {
        switch (err.message) {
          case 'jwt expired':
            return '登录过期';
          default:
            return '请先登录';
        }
      })();

      throw new CommonErrorRes({
        message: errMsg,
        error: err,
      });
    }

    await next();
  };

export default validTokenMw;
