const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const salesModel = require('../../../src/models/sales.model');
const salesServices = require('../../../src/services/sales.service');
const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');
const { listAllSales, saleById,
  newSaleResponseError1, newSaleResponseError2,
  newSaleResponseError4 } = require('./mocks/sale.mock');

describe('Testes da camada service do Sales', function () {
  it('Teste da função getAllSales, receber um array com as vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves([listAllSales]);
    const result = await salesServices.getAllSales();
    expect(result).to.be.deep.equal([listAllSales]);
  });
  it('Teste da função getSaleById, receber uma venda de acordo com o id', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([[saleById]]);
    const [[result]] = await salesServices.getSaleById(1);
    expect(result).to.be.deep.equal(saleById);
  });
  it('Teste da função getSaleById, receber um erro', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const result = await salesServices.getSaleById(3424); 
    expect(result).to.be.deep.equal('error');
  });
  // it('Teste da função addNewSale, cadastro com sucesso', async function () {
  //   const result = await salesServices.addNewSale(newSaleResponse); 
  //   const validateSale = await salesMiddlewares.validateSaleContent(newSaleResponse);
  //   expect(validateSale.message).to.be.deep.equal('ok');
  //   sinon.stub(salesServices, 'checkSale').resolves(newSale);
  //   expect(result).to.be.deep.equal({ type: 201, message: newSale });
  // });
  it('Teste da função addNewSale, cadastro sem sucesso (produto ausente)', async function () {
    const result = await salesServices.addNewSale(newSaleResponseError1); 
    const validateSale = await salesMiddlewares.validateSaleContent(newSaleResponseError1);
    expect(validateSale.message).to.be.deep.equal('"productId" is required');
    expect(result).to.be.deep.equal({ type: 400, message: '"productId" is required' });
  });
  it('Teste da função addNewSale, cadastro sem sucesso (quantidade 0)', async function () {
    const result = await salesServices.addNewSale(newSaleResponseError2); 
    const validateSale = await salesMiddlewares.validateSaleContent(newSaleResponseError2);
    expect(validateSale.message).to.be.deep.equal('"quantity" must be greater than or equal to 1');
    expect(result).to.be.deep
    .equal({ type: 422, message: '"quantity" must be greater than or equal to 1' });
  });
  // it('Teste da função addNewSale, cadastro sem sucesso (produto nao existe)', async function () {
  //   const result = await salesServices.addNewSale(newSaleResponseError3); 
  //   const validateSale = await salesMiddlewares.validateSaleContent(newSaleResponseError3);
  //   expect(validateSale.message).to.be.deep.equal('Product not found');
  //   expect(result).to.be.deep.equal({ type: 404, message: 'Product not found' });
  // });
  it('Teste da função addNewSale, cadastro sem sucesso (quantidade ausente)', async function () {
    const result = await salesServices.addNewSale(newSaleResponseError4); 
    const validateSale = await salesMiddlewares.validateSaleContent(newSaleResponseError4);
    expect(validateSale.message).to.be.deep.equal('"quantity" is required');
    expect(result).to.be.deep.equal({ type: 400, message: '"quantity" is required' });
  });
  afterEach(function () {
    sinon.restore();
  });
});