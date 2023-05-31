const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const salesModel = require('../../../src/models/sales.model');
const salesServices = require('../../../src/services/sales.service');
const { listAllSales, saleById } = require('./mocks/sale.mock');

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
  afterEach(function () {
    sinon.restore();
  });
});