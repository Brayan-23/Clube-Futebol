import { Request, Response } from 'express';

import TeamService from '../services/team.service';

export default class TeamController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamService.getTeams();
    return res.status(200).json(teams);
  }

  static async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.findById(id);
    return res.status(200).json(team);
  }
}
