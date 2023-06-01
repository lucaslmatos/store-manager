const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;
const salesController = require('../../../src/controllers/sales.controller');
const salesServices = require('../../../src/services/sales.service');
const { listAllSales, saleById, newSaleResponse, 
  newSale, newSaleResponseError1 } = require('./mocks/sale.mock');

describe('Testes da camada controller do Sales', function () {
  const res = {};

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  it('Teste da função getAllSales, receber um array com as vendas', async function () {
    const req = {};
    sinon.stub(salesServices, 'getAllSales').resolves([listAllSales]);
    await salesController.getAllSales(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly([listAllSales]);
  });
  it('Teste da função getSaleById, id existente', async function () {
    const req = { params: { id: 2 } };
    sinon.stub(salesServices, 'getSaleById').resolves([[saleById]]);
    await salesController.getSaleById(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly([[saleById]]);
  });
  it('Teste da função getSaleById, id inexistente', async function () {
    const req = { params: { id: 7656 } };
    sinon.stub(salesServices, 'getSaleById').resolves('error');
    await salesController.getSaleById(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Sale not found' });
  });
  it('Teste da função addNewSale, adicionar venda com sucesso', async function () {
    const req = { body: newSaleResponse };
    sinon.stub(salesServices, 'addNewSale').resolves({ type: 201, message: newSale });
    await salesController.addNewSale(req, res);
    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWithExactly(newSale);
  });
  it('Teste da função addNewSale, adicionar venda sem sucesso', async function () {
    const req = { body: newSaleResponseError1 };
    sinon.stub(salesServices, 'addNewSale')
    .resolves({ type: 400, message: '"productId" is required' });
    await salesController.addNewSale(req, res);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWithExactly({ message: '"productId" is required' });
  });
  afterEach(function () {
    sinon.restore();
  });
});