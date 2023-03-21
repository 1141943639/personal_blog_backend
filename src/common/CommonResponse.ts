import { pick } from 'lodash';

// 通用的返回值类型
export interface CommonResType<T> {
  code: number;
  message: string;
  result: T | null;
}

// 通用的返回类
class CommonRes<T> implements CommonResType<T> {
  code: number = 0;
  message: string = '';
  result: T | null = null;

  constructor(res?: Partial<CommonResType<T>>) {
    res &&
      Object.entries(res).forEach(([key, value]) => {
        Object.hasOwn(this, key) && value && (this[key] = value);
      });
  }
}

// 通用的返回成功类
export class CommonSuccessRes<T> extends CommonRes<T> {
  constructor(result: T | null = null, message: string = '请求成功') {
    super({
      message,
      result,
    });
  }
}

// 通用的返回失败类
export class CommonErrorRes<T = null> extends CommonRes<T> {
  error: Error;
  statusCode: number;

  get body(): CommonResType<T> {
    return pick(this, 'code', 'message', 'result');
  }

  constructor(
    res?: Partial<CommonRes<T> & { error: Error; statusCode: number }>
  ) {
    const {
      message = '网络错误, 请联系系统管理员',
      code = 99999,
      result,
      error = new Error(message),
      statusCode = 200,
    } = res || {};

    super({
      message,
      code,
      result,
    });

    this.error = error;
    this.statusCode = statusCode;
  }
}
