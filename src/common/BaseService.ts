import { ModelStatic, Model } from 'sequelize';

export default class BaseService<T extends Model> {
  model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  getByColumn(columnName: keyof T['dataValues'], value: any) {
    return this.model.findOne({
      where: {
        [columnName]: value,
      } as any,
    });
  }
}
