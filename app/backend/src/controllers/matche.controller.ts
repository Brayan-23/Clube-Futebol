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
}
