import * as express from 'express';
import loginMiddleware from '../middlewares/loginMiddleware';
import LoginController from '../controllers/login.contoller';

const loginRouter = express.Router();

loginRouter.post('/', loginMiddleware, (req, res) => LoginController.login(req, res));
loginRouter.get('/validate', (req, res) => LoginController.loginValidate(req, res));

export default loginRouter;

/* export default class Login {
  private router: express.IRouter;

  constructor() {
    this.router = express.Router();

    this.router.post('/', LoginController.login);
  }
} */
