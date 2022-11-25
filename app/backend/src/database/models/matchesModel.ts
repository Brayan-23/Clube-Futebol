import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './TeamModel';

export default class Matche extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
}

Matche.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    type: INTEGER,
  },
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  tableName: '',
});

Team.hasMany(Matche, { foreignKey: 'homeTeam', as: 'matchHome' });
Team.hasMany(Matche, { foreignKey: 'awayTeam', as: 'matchAway' });

Matche.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Matche.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });
