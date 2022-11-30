import * as express from 'express';
import BoardController from '../controllers/board.controller';

const boardRouter = express.Router();

boardRouter.get('/home', (req, res) => BoardController.boardHome(req, res));
boardRouter.get('/away', (req, res) => BoardController.boardAway(req, res));

export default boardRouter;
