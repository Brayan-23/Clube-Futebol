import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp from 'chai-http';
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
    it('Login successfully', async () => {
      sinon.stub(User, 'findOne').resolves(userMock as User);
      sinon.stub(bcrypt, 'compareSync').returns(true);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          "email": "admin@admin.com",
          "password": "secret_admin"
        });

      expect(chaiHttpResponse.status).to.be.equal(200);

/*       (User.findOne as sinon.SinonStub).restore();
      (bcrypt.compare as sinon.SinonStub).restore(); */
    });
  });

