import * as express from 'express';
import BoardController from '../controllers/board.controller';

const boardRouter = express.Router();

boardRouter.get('/home', (req, res) => BoardController.login(req, res));

export default boardRouter;
