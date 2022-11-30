import Team from '../database/models/TeamModel';
import Matche from '../database/models/matchesModel';
import { ILeaderBoard, ITeam, ITeamComplete } from '../utils/interfaces';

export default class BoardService {
  private static async generateBoard(jogo: string): Promise<ITeam[]> {
    if (jogo === 'away') {
      const games = await Matche
        .findAll(
          { include: [{ model: Team, as: 'teamAway', attributes: { exclude: ['id'] } }],
            where: { inProgress: false },
          },
        );
      return games;
    }
    const games = await Matche
      .findAll(
        { include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } }],
          where: { inProgress: false },
        },
      );
    return games;
  }

  private static async teams(id: number, jogo: string) {
    const jogos = await BoardService.generateBoard(jogo);
    if (jogo === 'away') {
      const filtro = jogos.filter((elem) => elem.awayTeam === id);
      return filtro;
    }
    const filtro = jogos.filter((elem) => elem.homeTeam === id);
    return filtro;
  }

  static async getLeaderBoard(jogo: string): Promise<ILeaderBoard[]> {
    const setResult = new Set();
    const leaderHome = await BoardService.returnValue(jogo);

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

  private static points(obj: ITeam[], jogo: string) {
    const result = obj.reduce((acc, curr) => {
      if (jogo === 'away') {
        if (curr.awayTeamGoals > curr.homeTeamGoals) return acc + 3;
        if (curr.awayTeamGoals === curr.homeTeamGoals) return acc + 1;
        return acc;
      }
      if (curr.homeTeamGoals > curr.awayTeamGoals) return acc + 3;
      if (curr.homeTeamGoals === curr.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  private static victoriesAway(obj: ITeam[], matches: string) {
    const result = obj.reduce((acc, curr) => {
      if (curr.awayTeamGoals > curr.homeTeamGoals && matches === 'vitorias') return acc + 1;
      if (curr.homeTeamGoals === curr.awayTeamGoals && matches === 'empates') return acc + 1;
      if (curr.homeTeamGoals > curr.awayTeamGoals && matches === 'derrotas') return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  private static victoriesHome(obj: ITeam[], matches: string) {
    const result = obj.reduce((acc, curr) => {
      if (curr.homeTeamGoals > curr.awayTeamGoals && matches === 'vitorias') return acc + 1;
      if (curr.awayTeamGoals === curr.homeTeamGoals && matches === 'empates') return acc + 1;
      if (curr.awayTeamGoals > curr.homeTeamGoals && matches === 'derrotas') return acc + 1;
      return acc;
    }, 0);
    return result;
  }

  private static goals(obj: ITeam[], jogo: string, matches = '') {
    if (jogo === 'away') {
      const goalsFavor = obj.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
      const goalsOwn = obj.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
      if (matches === 'goalsFavor') return goalsFavor;
      if (matches === 'goalsOwn') return goalsOwn;
      return goalsFavor - goalsOwn;
    }
    const goalsFavor = obj.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = obj.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    if (matches === 'goalsFavor') return goalsFavor;
    if (matches === 'goalsOwn') return goalsOwn;
    return goalsFavor - goalsOwn;
  }

  private static victoriesAwayAndHome(obj: ITeam[], jogo: string, matches: string) {
    return jogo === 'away' ? BoardService.victoriesAway(obj, matches)
      : BoardService.victoriesHome(obj, matches);
  }

  private static async board(objResult: ITeamComplete, jogo: string) {
    const teams = jogo === 'away' ? await BoardService.teams(objResult.awayTeam, jogo)
      : await BoardService.teams(objResult.homeTeam, jogo);
    const teste = BoardService.points(teams, jogo) / (teams.length * 3);
    const obj = {
      name: jogo === 'away' ? objResult.teamAway.teamName : objResult.teamHome.teamName,
      totalPoints: BoardService.points(teams, jogo),
      totalGames: teams.length,
      totalVictories: BoardService.victoriesAwayAndHome(teams, jogo, 'vitorias'),
      totalDraws: BoardService.victoriesAwayAndHome(teams, jogo, 'empates'),
      totalLosses: BoardService.victoriesAwayAndHome(teams, jogo, 'derrotas'),
      goalsFavor: BoardService.goals(teams, jogo, 'goalsFavor'),
      goalsOwn: BoardService.goals(teams, jogo, 'goalsOwn'),
      goalsBalance: BoardService.goals(teams, jogo),
      efficiency: (teste * 100).toFixed(2),
    };
    return obj;
  }

  private static async returnValue(jogo: string) {
    const jogos = await this.generateBoard(jogo);
    const map = jogos.map(async (elem) => {
      const response = await BoardService.board(elem as ITeamComplete, jogo);
      return response;
    });
    const promise = await Promise.all(map);
    return promise;
  }
}
