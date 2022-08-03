const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Joi = require('joi');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

chai.use(chaiAsPromised);

describe('services/salesService', () => {

  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve disparar um erro caso salesModel.list dispare um erro', () => {
      sinon.stub(salesModel, 'getAll').rejects();
      chai.expect(salesService.getAll()).to.eventually.be.rejected;
    });

    it('deve retornar os itens caso o salesModel.list retorne os itens', () => {
      sinon.stub(salesModel, 'getAll').resolves([]);
      chai.expect(salesService.getAll()).to.eventually.equal([]);
    });
  });

  describe('verifyItem', () => {
    it('deve disparar um erro caso salesModel.exists dispare um erro', () => {
      sinon.stub(salesModel, 'exists').rejects();
      chai.expect(salesService.verifyItem(0)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso salesModel.exists retorne false', () => {
      sinon.stub(salesModel, 'exists').resolves(false);
      chai.expect(salesService.verifyItem(0)).to.eventually.be.rejectedWith('NotFoundError');
    });

    it('deve retornar undefined caso o salesModel.exists retorne true', () => {
      sinon.stub(salesModel, 'exists').resolves(true);
      chai.expect(salesService.verifyItem(0)).to.eventually.be.undefined;
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso salesModel.get dispare um erro', () => {
      sinon.stub(salesModel, 'getById').rejects();
      chai.expect(salesService.getById(1)).to.eventually.be.rejected;
    });

    it('deve retornar o id caso o salesModel.get retorne o id', () => {
      sinon.stub(salesModel, 'getById').resolves({});
      chai.expect(salesService.getById(1)).to.eventually.equal({});
    });
  });

  describe('remove', () => {
    it('deve disparar um erro caso o salesModel.remove dispare um erro', () => {
      sinon.stub(salesModel, 'remove').rejects();
      chai.expect(salesService.remove(2)).to.eventually.be.rejected;
    });

    it('não deve ter retorno em caso de sucesso', () => {
      sinon.stub(salesModel, 'remove').resolves();
      chai.expect(salesService.remove(2)).to.eventually.be.undefined;
    });

  })

});