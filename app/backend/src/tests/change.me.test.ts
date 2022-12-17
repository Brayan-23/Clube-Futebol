import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';

import App from '../app';
import User from '../database/models/UserModel';
import {userMock} from './mocks/userMock.mock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes refetes ao login', () => {
  let chaiHttpResponse: Response; 

  beforeEach(async () => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
  });

  afterEach(() => {
(User.findOne as sinon.SinonStub).restore();
  });


    it('Login successfully', async () => {
      sinon.stub(bcrypt, 'compareSync').returns(true);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "secret_admin"
        });

      expect(chaiHttpResponse.status).to.be.equal(200);

      (bcrypt.compareSync as sinon.SinonStub).restore(); 
    });
    it('Login com erros de senha ou email', async () => {
      sinon.stub(bcrypt, 'compareSync').returns(false);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "pessego"
        });

      expect(chaiHttpResponse.status).to.be.equal(401);

      (bcrypt.compareSync as sinon.SinonStub).restore(); 
    });

    describe('Validation do Token', () => {
      it('Login com token correto', async () => {
        const token = {
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2Njk4NDQ1NzEsImV4cCI6MTY2OTkzMDk3MX0.-VX3o1RVIHFTggTwhZ32OdATFF82cGcNgxG-sWLUwIY',
        }
        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set(token);
  
        expect(chaiHttpResponse.status).to.be.equal(200);
      });
      it('Login com token incorreto', async () => {
        const token = {
          authorization: 'pessego',
        }
        chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set(token);
  
        expect(chaiHttpResponse.status).to.be.equal(401);
      });
    })
  });

