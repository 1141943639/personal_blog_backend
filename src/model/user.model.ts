import {
  InferAttributes,
  InferCreationAttributes,
  CreateOptions,
  DataTypes,
  Model,
} from 'sequelize';
import { USERNAME_MAX } from 'verify/user.verify';
import mysql from '../db/mysql';

type UserCreateOmit = 'id' | 'updatedAt' | 'createdAt';

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User, { omit: UserCreateOmit }>
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
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: {
      type: new DataTypes.CHAR(USERNAME_MAX),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR,
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

export type UserCreateAttr = InferCreationAttributes<
  User,
  { omit: UserCreateOmit }
>;
export type UserAttr = InferCreationAttributes<User>;

export default User;
