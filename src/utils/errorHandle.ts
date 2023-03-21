import { Middleware } from 'koa';
import { ValidationError } from 'sequelize';
import { CommonErrorRes } from '../common/CommonResponse';

const errorHandle: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let errRes = err as CommonErrorRes;

    // 抛出的错误如果不是封装好的错误类 将进行包装
    if (!(err instanceof CommonErrorRes)) {
      if (err instanceof ValidationError) {
        // 处理sequelize的错误
        errRes = new CommonErrorRes({
          message: err.errors[0].message,
          error: err,
        });
      } else if (err instanceof Error) {
        // 处理常规错误
        errRes = new CommonErrorRes({
          message: err.message,
          error: err,
        });
      } else {
        // 处理奇怪的错误
        errRes = new CommonErrorRes({
          error: new Error(err as any),
        });
      }
    }

    ctx.body = errRes.body;

    console.error(errRes.error);
  }
};

export default errorHandle;
