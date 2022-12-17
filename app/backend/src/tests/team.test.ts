import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/TeamModel';
import {teamMock} from './mocks/teamMock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Testes referentes a Teams', () => {
let reponse: Response;

it('Testa o sucesso da função getTemns', async () => {
    sinon.stub(Team, 'findAll').resolves(teamMock as any)

    reponse = await chai
    .request(app)
    .get('/teams');

    expect(reponse.status).to.be.equal(200);
    (Team.findAll as sinon.SinonStub).restore();
});
it('Testa o sucesso da função findById', async () => {
    sinon.stub(Team, 'findOne').resolves(teamMock[0] as any)

    reponse = await chai
    .request(app)
    .get('/teams/1')
   
    expect(reponse.status).to.be.equal(200);
    (Team.findOne as sinon.SinonStub).restore();
});
});