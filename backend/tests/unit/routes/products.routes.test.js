const chai = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const app = require('../../../src/app');

const { expect } = chai;

const productsController = require('../../../src/controllers/products.controller');

describe('Teste de integração das Rotas do Products', function () {
  it('deve chamar getAllProducts', async function () {
    const getAllProductsStub = sinon.stub(productsController, 'getAllProducts');
    getAllProductsStub.returns([]);
    const response = await supertest(app).get('/products');
    expect(response.status).to.equal(200);
    getAllProductsStub.restore();
  });
});