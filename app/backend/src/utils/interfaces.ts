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
  inProgress: boolean;
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}
