const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const productsModel = require('../../../src/models/products.model');
const { listAllProducts, productById, 
  newProduct, newProductResult, productEdit } = require('./mocks/product.mock');

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
  it('Teste da função getProductById, receber um erro de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([[undefined]]);
    const result = await productsModel.getProductById(5);
    expect(result).to.be.deep.equal('erro');
  });
  it('Teste da função addNewProduct, cadastro de novo produto com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall().resolves()
    .onSecondCall()
    .resolves([[newProductResult]]);
    const result = await productsModel.addNewProduct(newProduct.name);
    expect(result).to.be.deep.equal({ type: 201, message: newProductResult });
  });
  it('Teste da função editProduct, editar produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await productsModel.editProduct(2, productEdit.name);
    expect(result).to.be.deep.equal({ type: 200, message: { id: 2, name: productEdit.name } });
  });
  it('Teste da função deleteProduct, deletar produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await productsModel.deleteProduct(2);
    expect(result).to.be.deep.equal({ type: 204 });
  });
  afterEach(function () {
    sinon.restore();
  });
});