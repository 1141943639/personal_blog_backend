import BaseService from 'common/BaseService';
import { CommonErrorRes } from 'common/CommonResponse';
import { isEmpty } from 'lodash';
import User from 'model/user.model';

class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }

  /**
   * 检查是否有这个用户
   * @returns
   */
  async checkUser(error: CommonErrorRes, where: Partial<User['dataValues']>) {
    if (isEmpty(where)) return undefined;

    const res = await User.findOne({
      where,
    });

    if (!res) throw error;

    return res;
  }
}

export default new UserService();
