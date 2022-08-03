const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const salesModel = require('../../../models/salesModel');
const mysql = require('../../../models/connection');

describe('models/salesModels', () => {

  beforeEach(sinon.restore);

  describe('getAll', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(salesModel.getAll()).to.eventually.be.rejected;
    });

    it('deve retornas uma lista caso o connection.query retorne uma lista', () => {
      sinon.stub(mysql, 'execute').resolves([[]]);
      chai.expect(salesModel.getAll()).to.eventually.deep.equal([]);
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(salesModel.getById(2)).to.eventually.be.rejected;
    });

    it('deve retornar nada caso o connection.query retorne uma lista vazia', () => {
      sinon.stub(mysql, 'execute').resolves([
        []
      ]);
      chai.expect(salesModel.getById(2)).to.eventually.be.undefined;
    });

    it('deve retornar objeto com o result pesquisado caso o connection.query retorne um item na lista', () => {
      sinon.stub(mysql, 'execute').resolves([
        [{}]
      ]);
      chai.expect(salesModel.getAll(2)).to.eventually.deep.equal({});
    });

  });

  describe('remove', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(salesModel.remove(2)).to.eventually.be.rejected;
    });

    it('não deve ter retorno em caso de sucesso', () => {
      sinon.stub(mysql, 'execute').resolves();
      chai.expect(salesModel.remove(2)).to.eventually.be.undefined;
    });

    describe('exists', () => {
      it('deve disparar um erro caso o connection.query dispare um erro', () => {
        sinon.stub(mysql, 'execute').rejects();
        chai.expect(salesModel.exists(2)).to.eventually.be.rejected;
      });

      it('deve retornar false caso o connection.query retorne uma lista vazia', () => {
        sinon.stub(mysql, 'execute').resolves([
          []
        ]);
        chai.expect(salesModel.exists(2)).to.eventually.be.undefined;
      });

      it('deve retornar true caso o connection.query retorne um item na lista', () => {
        sinon.stub(mysql, 'execute').resolves([
          [{}]
        ]);
        chai.expect(salesModel.exists(2)).to.eventually.deep.equal({});
      });
    });

  });

});