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
  it('Teste da função deleteSale, deletar venda com sucesso', async function () {
    const req = { params: { id: 1 } };
    sinon.stub(salesServices, 'deleteSale')
    .resolves({ type: 204 });
    await salesController.deleteSale(req, res);
    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWithExactly();
  });
  it('Teste da função deleteSale, deletar venda sem sucesso', async function () {
    const req = { params: { id: 4234234 } };
    sinon.stub(salesServices, 'deleteSale')
    .resolves({ type: 404, message: 'Sale not found' });
    await salesController.deleteSale(req, res);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWithExactly({ message: 'Sale not found' });
  });
  it('Teste da função editQtdSale, editar produto da venda', async function () {
    const req = { body: { quantity: 10 }, params: { saleId: 1, productId: 1 } };
    sinon.stub(salesServices, 'editQtdSale')
    .resolves({ type: 200,
      message: {
      date: '2023-06-14T19:21:21.000Z',
      productId: 1,
      quantity: 10,
      saleId: 1,
    } });
    await salesController.editQtdSale(req, res);
    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWithExactly({
      date: '2023-06-14T19:21:21.000Z',
      productId: 1,
      quantity: 10,
      saleId: 1,
    });
  });
  it('Teste da função editQtdSale, editar produto da venda erro', async function () {
    const req = { body: { quantity: -1 }, params: { saleId: 1, productId: 1 } };
    sinon.stub(salesServices, 'editQtdSale')
    .resolves({ type: 422, 
      message: '"quantity" must be greater than or equal to 1' });
    await salesController.editQtdSale(req, res);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWithExactly({ message: 
      '"quantity" must be greater than or equal to 1' });
  });
  afterEach(function () {
    sinon.restore();
  });
});