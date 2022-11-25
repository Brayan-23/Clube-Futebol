import * as express from 'express';
import TeamController from '../controllers/team.controller';

const teamRouter = express.Router();

teamRouter.get('/', (req, res) => TeamController.getAll(req, res));
teamRouter.get('/:id', (req, res) => TeamController.findById(req, res));

export default teamRouter;
