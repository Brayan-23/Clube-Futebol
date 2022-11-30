import { Request, Response } from 'express';

import BoardService from '../services/leaderBoard.service';

export default class BoardController {
  static async login(req: Request, res: Response) {
    const result = (await BoardService.getLeaderBoard());
    return res.status(200).json(result);
  }
}
