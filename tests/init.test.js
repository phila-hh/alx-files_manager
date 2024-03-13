import api from '../server';
import chai from 'chai';
import supertest from 'supertest';


global.app = api;
global.request = supertest(api);
global.expect = chai.expect;
global.assert = chai.assert;
