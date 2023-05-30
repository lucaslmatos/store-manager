const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { listAllProducts, productById } = require('./mocks/product.mock');

describe('Testes da camada model do Products', function () {
  it('Teste da função getAllProducts, receber um array com os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([listAllProducts]);
    const result = await productsModel.getAllProducts();
    expect(result).to.be.deep.equal(listAllProducts);
  });
  it('Teste da função getProductById, receber um produto de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([[productById]]);
    const result = await productsModel.getProductById(2);
    expect(result).to.be.deep.equal(productById);
  });
  afterEach(function () {
    sinon.restore();
  });
});