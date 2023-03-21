import { CommonErrorRes, CommonSuccessRes } from 'common/CommonResponse';
import { IMiddleware } from 'koa-router';
import User from 'model/user.model';
import { changePwdSchema, registerSchema } from 'verify/user.verify';
import { InferType } from 'yup';
import jwt from 'jsonwebtoken';
import configDefault from 'config/config.default';

class UserController {
  register: IMiddleware = async (ctx) => {
    const reqBody = ctx.request.body as InferType<typeof registerSchema>;

    // 校验用户是否存在
    if (
      await User.findOne({
        where: {
          username: reqBody.username,
        },
      })
    )
      throw new CommonErrorRes({
        message: '已存在相同的用户名',
      });

    ctx.body = new CommonSuccessRes(
      (await User.create(ctx.request.body))?.dataValues
    );
  };

  login: IMiddleware = async (ctx) => {
    const user = await User.findOne(ctx.request.body);
    const exist = Boolean(user);

    // 校验用户是否存在
    if (!exist)
      throw new CommonErrorRes({
        message: '用户名或密码错误',
      });

    // 返回token
    ctx.body = new CommonSuccessRes({
      token: jwt.sign({ id: user.id }, configDefault.JWT_SECRET, {
        expiresIn: '10s',
      }),
    });
  };

  changePwd: IMiddleware = async (ctx) => {
    const reqBody = ctx.request.body as InferType<typeof changePwdSchema>;
    const { id } = ctx.state.user;

    await User.update(
      { password: reqBody.newPassword },
      {
        where: {
          id,
        },
      }
    );

    ctx.body = new CommonSuccessRes();
  };
}

export default new UserController();
