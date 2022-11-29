import * as express from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatcheController from '../controllers/matche.controller';

const matcheRouter = express.Router();
matcheRouter.get('/', (req, res) => MatcheController.getMatches(req, res));
matcheRouter.post('/', tokenValidation, (req, res) => MatcheController.insert(req, res));

export default matcheRouter;
