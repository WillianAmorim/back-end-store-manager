const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const productsService = require('../../../services/productService');

describe('/controllers/salesController', () => {

  beforeEach(sinon.restore);

  describe('getAll', () => {

    it('deve disparar um erro caso o salesService.list dispare um erro', () => {
      sinon.stub(salesService, 'getAll').rejects();
      chai.expect(salesController.getAll({}, {})).to.eventually.be.rejected;
    });

    it('deve retornar o res.status com 200 e o res.json com o resultado', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(salesService, 'getAll').resolves([{}]);
      await salesController.getAll({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{}]);
    });
  });

  describe('getById', () => {

    it('deve disparar um erro caso productsService.validateParamsId também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      chai.expect(salesController.getById({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso salesService.verifyItem também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'verifyItem').rejects();
      chai.expect(salesController.getById({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso salesService.get também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'verifyItem').resolves();
      sinon.stub(salesService, 'getById').rejects();
      chai.expect(salesController.getById({}, {})).to.eventually.be.rejected;
    });

    it('deve chamar o res.json e o status 200 caso não haja problemas', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'verifyItem').resolves();
      sinon.stub(salesService, 'getById').resolves({});
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await salesController.getById({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('remove', () => {
    it('deve disparar um erro caso productsService.validateParamsId também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      chai.expect(salesController.remove({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso salesService.verifyItem também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'verifyItem').rejects();
      chai.expect(salesController.remove({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso salesService.remove também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'verifyItem').resolves();
      sinon.stub(salesService, 'remove').rejects();
      chai.expect(salesController.remove({}, {})).to.eventually.be.rejected;
    });

    it('deve chamar o res.sendStatus com o status 204 caso sucess', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(salesService, 'verifyItem').resolves();
      sinon.stub(salesService, 'remove').resolves();
      const res = {
        sendStatus: sinon.stub().returns(),
      };
      await salesController.remove({}, res);
      chai.expect(res.sendStatus.getCall(0).args[0]).to.equal(204);
    });
  });

});