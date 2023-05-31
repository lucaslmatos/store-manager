const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productsModel = require('../../../src/models/products.model');
const productsServices = require('../../../src/services/products.service');
const { listAllProducts, productById } = require('./mocks/product.mock');

describe('Testes da camada service do Products', function () {
  it('Teste da função getAllProducts, receber um array com os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves([listAllProducts]);
    const result = await productsServices.getAllProducts();
    expect(result).to.be.deep.equal([listAllProducts]);
  });
  it('Teste da função getProductById, receber um produto de acordo com o id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves([[productById]]);
    const [[result]] = await productsServices.getProductById(2);
    expect(result).to.be.deep.equal(productById);
  });
  it('Teste da função getProductById, receber um erro', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    const result = await productsServices.getProductById(1342342); 
    expect(result).to.be.deep.equal('error');
  });
  afterEach(function () {
    sinon.restore();
  });
});