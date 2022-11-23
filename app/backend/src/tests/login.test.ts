import * as chai from 'chai';
import * as sinon from 'sinon';

import chaiHttp from 'chai-http';
import App from '../app';

chai.use(chaiHttp);

const {app} = new App();

const {expect} = chai;


describe('Testes refentes ao')