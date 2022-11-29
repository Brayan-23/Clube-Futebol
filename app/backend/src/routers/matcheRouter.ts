import * as express from 'express';
import tokenValidation from '../middlewares/tokenValidation';
import MatcheController from '../controllers/matche.controller';

const matcheRouter = express.Router();
matcheRouter.patch('/:id/finish', (req, res) => MatcheController.update(req, res));
matcheRouter.patch('/:id', (req, res) => MatcheController.updateId(req, res));
matcheRouter.get('/', (req, res) => MatcheController.getMatches(req, res));
matcheRouter.post('/', tokenValidation, (req, res) => MatcheController.insert(req, res));

export default matcheRouter;
