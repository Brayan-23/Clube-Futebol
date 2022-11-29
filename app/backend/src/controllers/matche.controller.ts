import { Request, Response } from 'express';

import MatcheService from '../services/matche.service';

export default class MatcheController {
  static async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const result = inProgress === undefined
      ? await MatcheService.getMatches()
      : await MatcheService.getInProgress(String(inProgress));
    return res.status(200).json(result);
  }

  static async insert(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const response = await MatcheService.insert(homeTeam, awayTeam, homeTeamGoals, awayTeamGoals);
    return res.status(201)
      .json({
        id: response.id,
        homeTeam,
        awayTeam,
        homeTeamGoals,
        awayTeamGoals,
        inProgress: true });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    await MatcheService.update(Number(id));
    return res.status(200).json({ message: 'finished' });
  }

  static async updateId(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatcheService.updateId(homeTeamGoals, awayTeamGoals, Number(id));
    return res.status(200).json({ message: 'Atualizado com Sucesso' });
  }
}
