import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import App from '../app';
import Team from '../database/models/TeamModel';
import {macthMock} from './mocks/matchMock';
import { teamMock } from './mocks/teamMock';
import { Response } from 'superagent';
import Matche from '../database/models/matchesModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;


describe('Testes referentes a model Team', () => {
    let chaiHttpResponse: Response;
 it('Testa o sucesso ta função getTeams', async () => {
     sinon.stub(Matche, 'findAll').resolves(macthMock as any);
     chaiHttpResponse = await chai
     .request(app)
     .get('/matches')

     expect(chaiHttpResponse.status).to.be.equal(200);
     (Matche.findAll as sinon.SinonStub).restore();
 });
 it('Testa o sucesso ta função getInProgress', async () => {
     sinon.stub(Matche, 'findAll').resolves(macthMock as any);
     chaiHttpResponse = await chai
     .request(app)
     .get('/matches')
     .query({
        inProgress: true
     })

     expect(chaiHttpResponse.status).to.be.equal(200);
     (Matche.findAll as sinon.SinonStub).restore();
 });
 it('Testa o sucesso ta função Insert', async () => {
    const token = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2Njk4NDIzMzgsImV4cCI6MTY2OTkyODczOH0.O4fNJIHzNLUhuUwcFPb9sJZL4YcQczVxjzNuVSHAg3A'
    }
     sinon.stub(Team, 'findOne').resolves(teamMock as any);
     sinon.stub(Matche, 'create').resolves({id: 1} as any);
     chaiHttpResponse = await chai
     .request(app)
     .post('/matches')
     .set(token)
     .send({
        homeTeam: 1,
        awayTeam: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 1,
     })

     expect(chaiHttpResponse.status).to.be.equal(200);
     (Matche.create as sinon.SinonStub).restore();
     (Team.findOne as sinon.SinonStub).restore();
 });
});