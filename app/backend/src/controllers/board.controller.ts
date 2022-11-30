import { Request, Response } from 'express';

import BoardService from '../services/leaderBoardHomeAway.service';
import LeardBoard from '../services/leaderBoard.service';

export default class BoardController {
  static async boardHome(req: Request, res: Response) {
    const result = (await BoardService.getLeaderBoard('home'));
    return res.status(200).json(result);
  }

  static async boardAway(req: Request, res: Response) {
    const result = (await BoardService.getLeaderBoard('away'));
    return res.status(200).json(result);
  }

  static async leaderBoard(req: Request, res: Response) {
    const result = await LeardBoard.leardBoard();
    return res.status(200).json(result);
  }
}
