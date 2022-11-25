/* import HttpException from '../utils/Error'; */
/* import Token from '../utils/token.util'; */
import Team from '../database/models/TeamModel';

export default class TeamService {
  static async getTeams(): Promise<Team[]> {
    const team = await Team.findAll();
    return team;
  }

  static async findById(id: string): Promise<Team | null> {
    const team = await Team.findOne({ where: { id } });
    return team;
  }
}
