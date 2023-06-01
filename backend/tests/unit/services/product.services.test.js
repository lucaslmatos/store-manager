const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const productsModel = require('../../../src/models/products.model');
const productsServices = require('../../../src/services/products.service');
const { listAllProducts, productById, 
  newProductResult, newProduct, newProduct3char } = require('./mocks/product.mock');

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
    sinon.stub(productsModel, 'getProductById').resolves('erro');
    const result = await productsServices.getProductById(1342342); 
    expect(result).to.be.deep.equal('error');
  });
  it('Teste da função addNewProduct, cadastro de novo produto com sucesso', async function () {
    const result = await productsServices.addNewProduct(newProduct.name);
    expect(result).to.be.deep.equal({ type: 201, message: newProductResult });
  });
  it('Teste da função addNewProduct, cadastro de novo produto sem nome', async function () {
    const result = await productsServices.addNewProduct('');
    expect(result).to.be.deep.equal({ type: 400, message: '"name" is required' });
  });
  it('Teste da função addNewProduct, cadastro de novo produto com nome errado', async function () {
    const result = await productsServices.addNewProduct(newProduct3char.name);
    expect(result).to.be.deep.equal({ type: 422, 
      message: '"name" length must be at least 5 characters long' });
  });
  afterEach(function () {
    sinon.restore();
  });
});