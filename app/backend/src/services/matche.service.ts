/* import HttpException from '../utils/Error'; */
/* import Token from '../utils/token.util'; */
import Team from '../database/models/TeamModel';
import Matche from '../database/models/matchesModel';

export default class MatchService {
  static async getMatches(): Promise<Matche[]> {
    const games = await Matche
      .findAll(
        { include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
        },
      );
    return games;
  }

  static async getInProgress(inProgress: string): Promise<Matche[]> {
    const result = inProgress === 'true';
    const progress = await Matche.findAll(
      {
        where: { inProgress: result },
        include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
      },
    );
    return progress;
  }
}
