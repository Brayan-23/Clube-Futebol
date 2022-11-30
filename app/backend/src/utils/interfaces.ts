export default interface ILogin {
  email: string,
  password: string;
  id?: number
}

export interface IUserMock {
  id: number;
  username: string;
  role: string;
  email: string
  password: string;
}

export interface ITeam {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export interface ITeamComplete extends ITeam {
  inProgress: boolean;
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}
export interface ILeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
