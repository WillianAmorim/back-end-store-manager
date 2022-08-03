const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsService = require('../../../services/productService');
const productsController = require('../../../controllers/productsController');

describe('/controllers/productsController', () => {

  beforeEach(sinon.restore);

  describe('create', () => {
    it('deve disparar um erro caso o productsService.validateBodyAdd dispare um erro', () => {
      sinon.stub(productsService, 'validateBodyAdd').rejects();
      chai.expect(productsController.create({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o products.add dispare um erro', () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'create').rejects();
      chai.expect(productsController.create({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o productsService.get disparar um erro', () => {
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'create').resolves();
      sinon.stub(productsService, 'getById').rejects();
      chai.expect(productsController.create({}, {})).to.eventually.be.rejected;
    });

    it('deve chamar o res.status com 201 e o res.json', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsService, 'validateBodyAdd').resolves();
      sinon.stub(productsService, 'create').resolves();
      sinon.stub(productsService, 'getById').resolves({});
      await productsController.create({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
    });

  describe('getAll', () => {

    it('deve disparar um erro caso o productsService.list dispare um erro', () => {
      sinon.stub(productsService, 'getAll').rejects();
      chai.expect(productsController.getAll({}, {})).to.eventually.be.rejected;
    });

    it('deve retornar o res.status com 200 e o res.json com o resultado', async () => {
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      sinon.stub(productsService, 'getAll').resolves([{}]);
      await productsController.getAll({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{}]);
    });
  });

  describe('getById', () => {

    it('deve disparar um erro caso productsService.validateParamsId também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      chai.expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso productsService.verifyItem também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'verifyItem').rejects();
      chai.expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso productsService.get também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'verifyItem').resolves();
      sinon.stub(productsService, 'getById').rejects();
      chai.expect(productsController.getById({}, {})).to.eventually.be.rejected;
    });

    it('deve chamar o res.json e o status 200 caso não haja problemas', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'verifyItem').resolves();
      sinon.stub(productsService, 'getById').resolves({});
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await productsController.getById({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('remove', () => {
    it('deve disparar um erro caso productsService.validateParamsId também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      chai.expect(productsController.remove({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso productsService.verifyItem também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'verifyItem').rejects();
      chai.expect(productsController.remove({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso productsService.remove também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'verifyItem').resolves();
      sinon.stub(productsService, 'remove').rejects();
      chai.expect(productsController.remove({}, {})).to.eventually.be.rejected;
    });

    it('deve chamar o res.sendStatus com o status 204 caso sucess', async () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'verifyItem').resolves();
      sinon.stub(productsService, 'remove').resolves();
      const res = {
        sendStatus: sinon.stub().returns(),
      };
      await productsController.remove({}, res);
      chai.expect(res.sendStatus.getCall(0).args[0]).to.equal(204);
    });
  });

  describe('update', () => {

    it('deve disparar um erro caso productsService.validateParamsId também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').rejects();
      chai.expect(productsController.update({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso productsService.validateBodyAdd também dispare', () => {
      sinon.stub(productsService, 'validateBodyAdd').rejects();
      chai.expect(productsController.update({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso productsService.verifyItem também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'verifyItem').rejects();
      chai.expect(productsController.update({}, {})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso productsService.update também dispare', () => {
      sinon.stub(productsService, 'validateParamsId').resolves({});
      sinon.stub(productsService, 'validateBodyAdd').resolves({});
      sinon.stub(productsService, 'verifyItem').resolves();
      sinon.stub(productsService, 'update').rejects();
      chai.expect(productsController.update({}, {})).to.eventually.be.rejected;
    });

    it('deve retornar o status 200 e o produto atualizado', async () => {
      const req = {
        params: {
          id: '1'
        },
        body: {
          name: 'qualquer'
        }
      }
      sinon.stub(productsService, 'validateParamsId').resolves(req.params);
      sinon.stub(productsService, 'validateBodyAdd').resolves(req.body);
      sinon.stub(productsService, 'verifyItem').resolves();
      sinon.stub(productsService, 'getById').resolves({});
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await productsController.update(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal({});
    });
  });

  describe('getByQuery', () => {

    it('deve disparar um erro caso productsService.getByNAme também dispare', () => {
      sinon.stub(productsService, 'getByQuery').rejects();
      chai.expect(productsController.getByQuery({}, {})).to.eventually.be.rejected;
    });

    it('deve retornar o status 200 e os produtos', async () => {
      sinon.stub(productsService, 'getByQuery').resolves([{}]);
      const req = {
        query: { q: 'Tênis do Flash' }
      }
      const res = {
        status: sinon.stub().callsFake(() => res),
        json: sinon.stub().returns(),
      };
      await productsController.getByQuery(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.json.getCall(0).args[0]).to.deep.equal([{}]);
    });
  });

});