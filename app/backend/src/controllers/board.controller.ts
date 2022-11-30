import { Request, Response } from 'express';

import BoardService from '../services/leaderBoard.service';

export default class BoardController {
  static async boardHome(req: Request, res: Response) {
    const result = (await BoardService.getLeaderBoard('home'));
    return res.status(200).json(result);
  }

  static async boardAway(req: Request, res: Response) {
    const result = (await BoardService.getLeaderBoard('away'));
    return res.status(200).json(result);
  }
}
