import { Request, Response } from 'express';

import LoginService from '../services/login.service';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    return res.status(200).json({ token });
  }

  static async loginValidate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const role = await LoginService.LoginValidate(authorization as string);
    return res.status(200).json({ role });
  }
}
