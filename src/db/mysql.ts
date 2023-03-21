import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  // database: 'some_db',
  // TODO 后续需要换成mysql
  dialect: 'sqlite',
  storage: 'sqliteDB.sqlite',
});

(async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');
  } catch (err) {
    console.error('数据库连接失败 错误: ', err);
  }
  try {
    await sequelize.sync();
    console.log('数据库同步成功');
  } catch (err) {
    console.error('数据库同步失败 错误: ', err);
  }
})();

export default sequelize;
