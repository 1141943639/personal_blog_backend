import { IMiddleware } from 'koa-router';
import { CommonRouterOpt } from 'types/router/CommonRouterProps';
import { some } from 'lodash';

const validTokenMw: (opt?: CommonRouterOpt) => IMiddleware =
  (opt) => (ctx, next) => {
    const { req } = ctx;

    if (opt?.unauthorizedInterface === '*') return next();

    const matchRouterPath = opt?.unauthorizedInterface?.map((path) => ({
      path: [opt.prefix, path].join(''),
    }));

    if (some(matchRouterPath, { path: req.url })) return next();
    // TODO 补完校验逻辑

    next();
  };

export default validTokenMw;
