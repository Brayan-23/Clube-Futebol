import { Request, Response } from 'express';

import MatcheService from '../services/matche.service';

export default class MatcheController {
  static async getAll(req: Request, res: Response) {
    const games = await MatcheService.getMatches();
    return res.status(200).json(games);
  }
}
