const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const productsController = require('../../../src/controllers/products.controller');
const productsServices = require('../../../src/services/products.service');
const { listAllProducts, productById } = require('./mocks/producst.mock');

describe('Testes da camada controller do Products', function () {
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('Teste da função getAllProducts, receber um array com os produtos', async function () {
    const req = {};
    sinon.stub(productsServices, 'getAllProducts').resolves([listAllProducts]);
    await productsController.getAllProducts(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly([listAllProducts]);
  });
  it('Teste da função getProductById, id existente', async function () {
    const req = { params: { id: 2 } };
    sinon.stub(productsServices, 'getProductById').resolves([[productById]]);
    await productsController.getProductById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly([[productById]]);
  });
  it('Teste da função getProductById, id inexistente', async function () {
    const req = { params: { id: 7656 } };
    sinon.stub(productsServices, 'getProductById').resolves('error');
    await productsController.getProductById(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Product not found' });
  });
  afterEach(function () {
    sinon.restore();
  });
});