import Team from '../database/models/TeamModel';
import Matche from '../database/models/matchesModel';
import { ILeaderBoard, ITeam, ITeamComplete } from '../utils/interfaces';

export default class BoardService {
  private static async generateBoard(): Promise<ITeam[]> {
    const games = await Matche
      .findAll(
        { include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } }],
          where: { inProgress: false },
        },
      );
    return games;
  }

  private static async teams(id: number) {
    const jogos = await BoardService.generateBoard();
    const filtro = jogos.filter((elem) => elem.homeTeam === id);
    return filtro;
  }

  static async getLeaderBoard(): Promise<ILeaderBoard[]> {
    const setResult = new Set();
    const leaderHome = await BoardService.returnValue();

    const boardLeader = leaderHome.filter((item) => {
      const duplicatedTeam = setResult.has(item.name);
      setResult.add(item.name);
      return !duplicatedTeam;
    });
    return boardLeader.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      return 0;
    });
  }

  private static points(obj: ITeam[]) {
    const result = obj.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  private static victoriesAndDraws(obj: ITeam[], matches: string) {
    const result = obj.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals && matches === 'vitorias') return acc + 1;
      if (curr.awayTeamGoals === curr.homeTeamGoals && matches === 'empates') return acc + 1;
      if (curr.awayTeamGoals > curr.homeTeamGoals && matches === 'derrotas') return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  private static goals(obj: ITeam[], matches = '') {
    const goalsFavor = obj.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = obj.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    if (matches === 'goalsFavor') return goalsFavor;
    if (matches === 'goalsOwn') return goalsOwn;
    return goalsFavor - goalsOwn;
  }

  private static async board(objResult: ITeamComplete) {
    const teams = await BoardService.teams(objResult.homeTeam);
    const teste = BoardService.points(teams) / (teams.length * 3);
    const obj = {
      name: objResult.teamHome.teamName,
      totalPoints: BoardService.points(teams),
      totalGames: teams.length,
      totalVictories: BoardService.victoriesAndDraws(teams, 'vitorias'),
      totalDraws: BoardService.victoriesAndDraws(teams, 'empates'),
      totalLosses: BoardService.victoriesAndDraws(teams, 'derrotas'),
      goalsFavor: BoardService.goals(teams, 'goalsFavor'),
      goalsOwn: BoardService.goals(teams, 'goalsOwn'),
      goalsBalance: BoardService.goals(teams),
      efficiency: (teste * 100).toFixed(2),
    };
    return obj;
  }

  private static async returnValue() {
    const jogos = await this.generateBoard();
    const map = jogos.map(async (elem) => {
      const response = await BoardService.board(elem as ITeamComplete);
      return response;
    });
    const promise = await Promise.all(map);
    return promise;
  }
}
