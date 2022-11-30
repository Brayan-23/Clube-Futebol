import BoardService from './leaderBoardHomeAway.service';
import { ILeaderBoard } from '../utils/interfaces';

export default class LeardBoard {
  static async leardBoard() {
    const home = await BoardService.getLeaderBoard('home');
    const away = await BoardService.getLeaderBoard('away');

    const map = home.map((h) => {
      const find = away.find((a) => h.name === a.name);
      return LeardBoard.board(h, find as ILeaderBoard);
    });
    return map.sort((a, b) => {
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

  private static board(objHome: ILeaderBoard, objAway: ILeaderBoard) {
    const totalGames = objHome.totalGames + objAway.totalGames;
    const totalPoints = objHome.totalPoints + objAway.totalPoints;
    const goalsFavor = objHome.goalsFavor + objAway.goalsFavor;
    const goalsOwn = objHome.goalsOwn + objAway.goalsOwn;
    const teste = totalPoints / (totalGames * 3);
    const obj = {
      name: objHome.name,
      totalPoints,
      totalGames,
      totalVictories: objHome.totalVictories + objAway.totalVictories,
      totalDraws: objHome.totalDraws + objAway.totalDraws,
      totalLosses: objHome.totalLosses + objAway.totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: (teste * 100).toFixed(2),
    };
    return obj;
  }
}
