import mysql from 'db/mysql';
import {
  CreateOptions,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User, { omit: 'id' | 'updatedAt' | 'createdAt' }>
> {
  declare id: CreateOptions<number>;
  declare username: string;
  declare password: string;
  declare createdAt: CreateOptions<Date>;
  declare updatedAt: CreateOptions<Date>;
}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.NUMBER,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: mysql,
    tableName: 'user',
  }
);

export default User;
