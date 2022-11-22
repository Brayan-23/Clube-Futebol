import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

export default class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    type: INTEGER,
  },
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: 'users',
});
