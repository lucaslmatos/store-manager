const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const { listAllSales, saleById, newSale, newSaleResponse } = require('./mocks/sale.mock');

describe('Testes da camada model do Sales', function () {
  it('Teste da função getAllSales, receber um array com as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([listAllSales]);
    const result = await salesModel.getAllSales();
    expect(result).to.be.deep.equal(listAllSales);
  });
  it('Teste da função getSaleById, receber uma venda de acordo com o id', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);
    const result = await salesModel.getSaleById(2);
    expect(result).to.be.deep.equal(saleById);
  });
  it('Teste da função addNewSale, adicionar uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall().resolves()
    .onSecondCall()
    .resolves();
    const result = await salesModel.addNewSale(newSale);
    expect(result).to.be.deep.equal(newSaleResponse);
  });
  it('Teste da função deleteSale, deletar venda com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves();
    const result = await salesModel.deleteSale(1);
    expect(result).to.be.deep.equal({ type: 204 });
  });
  it('Teste da função editQtdSale, alterar venda com sucesso', async function () {
    sinon.stub(connection, 'execute')
    .onFirstCall().resolves()
    .onSecondCall()
    .resolves()
    .onThirdCall()
    .resolves([[{
      date: '2023-06-14T19:21:21.000Z',
      productId: 1,
      quantity: 10,
      saleId: 1,
    }]]);
    const result = await salesModel.editQtdSale(1, 1, 10);
    expect(result).to.be.deep.equal({ type: 200,
      message: {
      date: '2023-06-14T19:21:21.000Z',
      productId: 1,
      quantity: 10,
      saleId: 1,
    } });
  });
  afterEach(function () {
    sinon.restore();
  });
});