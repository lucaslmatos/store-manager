const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const { listAllSales, saleById } = require('./mocks/sale.mock');

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
  afterEach(function () {
    sinon.restore();
  });
});