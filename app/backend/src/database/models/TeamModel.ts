import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    type: INTEGER,
  },
  teamName: STRING,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: '',
});
