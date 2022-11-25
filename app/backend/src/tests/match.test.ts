import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import App from '../app';
import Team from '../database/models/TeamModel';
import {macthMock} from './mocks/matchMock';
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
});