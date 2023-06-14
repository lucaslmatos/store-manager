const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const salesModel = require('../../../src/models/sales.model');
const salesServices = require('../../../src/services/sales.service');
const salesMiddlewares = require('../../../src/middlewares/sales.middlewares');
const { listAllSales, saleById,
  newSaleResponseError1, newSaleResponseError2, newSaleResponseError3,
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
  //   sinon.stub(salesMiddlewares, 'checkSaleContent').resolves(true);
  //   sinon.stub(salesMiddlewares, 'validateSaleContent').resolves({ type: 200, message: 'ok' });
  //   sinon.stub(salesServices, 'checkSale').resolves(newSale);
  //   sinon.stub(salesModel, 'addNewSale').resolves({ productId: 1, quantity: 1 });
  //   const result = await salesServices.addNewSale(newSaleResponse);
  //   // const result2 = await salesMiddlewares.validateSaleContent(newSaleResponse);
  //   // const result3 = await salesServices.checkSale(newSaleResponse);
  //   // expect(result3).to.be.deep.equal(newSale);
  //   // expect(result2).to.be.deep.equal({ type: 200, message: 'ok' });
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
  it('Teste da função addNewSale, cadastro sem sucesso (produto nao existe)', async function () {
    sinon.stub(salesMiddlewares, 'validateSaleContent').resolves({ 
      type: 404, message: 'Product not found' });
    const result = await salesServices.addNewSale(newSaleResponseError3); 
    expect(result).to.be.deep.equal({ 
      type: 404, message: 'Product not found' });
  });
  it('Teste da função addNewSale, cadastro sem sucesso (quantidade ausente)', async function () {
    const result = await salesServices.addNewSale(newSaleResponseError4); 
    const validateSale = await salesMiddlewares.validateSaleContent(newSaleResponseError4);
    expect(validateSale.message).to.be.deep.equal('"quantity" is required');
    expect(result).to.be.deep.equal({ type: 400, message: '"quantity" is required' });
  });
  it('Teste da função deleteSale, id existente', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([
      {
        date: '2023-05-30T23:58:40.000Z',
        productId: 3,
        quantity: 15,
      },
    ]);
    sinon.stub(salesModel, 'deleteSale').resolves({ type: 204 });
    const result = await salesServices.deleteSale(1);
    expect(result).to.be.deep.equal({ type: 204 });
  });
  it('Teste da função deleteSale, id inexistente', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const result = await salesServices.deleteSale(1);
    expect(result).to.be.deep.equal({ type: 404, message: 'Sale not found' });
  });
  it('Teste da função editQtdSale, alteração com sucesso', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([
      {
        date: '2023-05-30T23:58:40.000Z',
        productId: 1,
        quantity: 15,
      },
    ]);
    sinon.stub(salesModel, 'editQtdSale').resolves({ type: 200,
      message: {
      date: '2023-06-14T19:21:21.000Z',
      productId: 1,
      quantity: 10,
      saleId: 1,
    } });
    const result = await salesServices.editQtdSale(1, 1, 10);
    expect(result).to.be.deep.equal({ type: 200,
      message: {
      date: '2023-06-14T19:21:21.000Z',
      productId: 1,
      quantity: 10,
      saleId: 1,
    } });
  });
  it('Teste da função editQtdSale, qtd < 0', async function () {
    const result = await salesServices.editQtdSale(1, 1, -1);
    expect(result).to.be.deep.equal({ type: 422, 
      message: '"quantity" must be greater than or equal to 1' });
  });
  it('Teste da função editQtdSale, qtd inexistente', async function () {
    const result = await salesServices.editQtdSale(1, 1);
    expect(result).to.be.deep.equal({ type: 400, message: '"quantity" is required' });
  });
  it('Teste da função editQtdSale, id de venda inexistente', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const result = await salesServices.editQtdSale(12313, 1, 10);
    expect(result).to.be.deep.equal({ type: 404, message: 'Sale not found' });
  });
  it('Teste da função editQtdSale, id de produto inexistente', async function () {
    sinon.stub(salesModel, 'getSaleById').resolves([
      {
        date: '2023-05-30T23:58:40.000Z',
        productId: 1,
        quantity: 15,
      },
    ]);
    const result = await salesServices.editQtdSale(1, 213123, 10);
    expect(result).to.be.deep.equal({ type: 404, message: 'Product not found in sale' });
  });
  afterEach(function () {
    sinon.restore();
  });
});