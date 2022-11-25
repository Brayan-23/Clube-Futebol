import * as express from 'express';
import MatcheController from '../controllers/matche.controller';

const matcheRouter = express.Router();
matcheRouter.get('/', (req, res) => MatcheController.getMatches(req, res));

export default matcheRouter;
