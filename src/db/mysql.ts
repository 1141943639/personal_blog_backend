import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  // TODO 后续需要换成mysql
  dialect: 'sqlite',
  storage: 'sqliteDB',
});

export default sequelize;
