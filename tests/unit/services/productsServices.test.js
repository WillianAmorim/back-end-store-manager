const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Joi = require('joi');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('services/productsService', () => {

  beforeEach(sinon.restore);

  describe('create', () => {
    it('deve disparar um erro caso productsModel.add dispare um erro', () => {
      sinon.stub(productsModel, 'create').rejects();
      chai.expect(productsService.create({})).to.eventually.be.rejected;
    });

    it('deve retornar o id caso o productsModel.add retorne o id', () => {
      sinon.stub(productsModel, 'create').resolves(1);
      chai.expect(productsService.create({})).to.eventually.equal(1);
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso productsModel.get dispare um erro', () => {
      sinon.stub(productsModel, 'getById').rejects();
      chai.expect(productsService.getById(1)).to.eventually.be.rejected;
    });

    it('deve retornar o id caso o productsModel.get retorne o id', () => {
      sinon.stub(productsModel, 'getById').resolves({});
      chai.expect(productsService.getById(1)).to.eventually.equal({});
    });
  });

  describe('getAll', () => {
    it('deve disparar um erro caso productsModel.list dispare um erro', () => {
      sinon.stub(productsModel, 'getAll').rejects();
      chai.expect(productsService.getAll()).to.eventually.be.rejected;
    });

    it('deve retornar os itens caso o productsModel.list retorne os itens', () => {
      sinon.stub(productsModel, 'getAll').resolves([]);
      chai.expect(productsService.getAll()).to.eventually.equal([]);
    });
  });

  describe('verifyItem', () => {
    it('deve disparar um erro caso productsModel.exists dispare um erro', () => {
      sinon.stub(productsModel, 'exists').rejects();
      chai.expect(productsService.verifyItem(0)).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso productsModel.exists retorne false', () => {
      sinon.stub(productsModel, 'exists').resolves(false);
      chai.expect(productsService.verifyItem(0)).to.eventually.be.rejectedWith('NotFoundError');
    });

    it('deve retornar undefined caso o productsModel.exists retorne true', () => {
      sinon.stub(productsModel, 'exists').resolves(true);
      chai.expect(productsService.verifyItem(0)).to.eventually.be.undefined;
    });
  });

  describe('remove', () => {
    it('deve disparar um erro caso o productsModel.remove dispare um erro', () => {
      sinon.stub(productsModel, 'remove').rejects();
      chai.expect(productsService.remove(2)).to.eventually.be.rejected;
    });

    it('não deve ter retorno em caso de sucesso', () => {
      sinon.stub(productsModel, 'remove').resolves();
      chai.expect(productsService.remove(2)).to.eventually.be.undefined;
    });

  })

  describe('getByQuery', () => {
    it('deve disparar um erro caso productsModel. dispare um erro', () => {
      sinon.stub(productsModel, 'getByQuery').rejects();
      chai.expect(productsService.getByQuery('Tênis do Flash')).to.eventually.be.rejected;
    });

    it('deve retornar o itens caso o productsModel.getByName retorne os itens', () => {
      sinon.stub(productsModel, 'getByQuery').resolves([]);
      chai.expect(productsService.getByQuery('Tênis do Flash')).to.eventually.equal([]);
    });
  });

  describe('update', () => {
    it('deve disparar um erro caso o productsModel.update dispare um erro', () => {
      sinon.stub(productsModel, 'update').rejects();
      chai.expect(productsService.update('Tênis do Flash', 3)).to.eventually.be.rejected;
    });

    it('não deve ter retorno em caso de sucesso', () => {
      sinon.stub(productsModel, 'update').resolves();
      chai.expect(productsService.update('Tênis do Flash', 3)).to.eventually.be.undefined;
    });

  });

});