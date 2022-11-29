/* import HttpException from '../utils/Error'; */
/* import Token from '../utils/token.util'; */
import HttpException from '../utils/Error';
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

  static async insert(
    homeTeam: number,
    awayTeam: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Matche> {
    if (homeTeam === awayTeam) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }
    const result = await Matche
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });

    return result;
  }

  static async update(id: number): Promise<void> {
    await Matche.update({ inProgress: false }, { where: { id } });
  }
}
