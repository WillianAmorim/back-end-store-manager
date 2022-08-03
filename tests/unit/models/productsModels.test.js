const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsModel = require('../../../models/productsModel');
const mysql = require('../../../models/connection');

describe('models/productsModel', () => {

  beforeEach(sinon.restore);

  describe('create', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(productsModel.create({})).to.eventually.be.rejected;
    });

    it('deve retornar o id inserido caso dê sucesso', () => {
      sinon.stub(mysql, 'execute').resolves([{ insertId: 1 }]);
      chai.expect(productsModel.create({})).to.eventually.equal(1);
    });
  });

  describe('getById', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(productsModel.getById(2)).to.eventually.be.rejected;
    });

    it('deve retornar nada caso o connection.query retorne uma lista vazia', () => {
      sinon.stub(mysql, 'execute').resolves([[]]);
      chai.expect(productsModel.getById(0)).to.eventually.be.undefined;
    });

    it('deve retornar objeto com o result pesquisado caso o connection.query retorne um item na lista', () => {
      sinon.stub(mysql, 'execute').resolves([[{}]]);
      chai.expect(productsModel.getById(2)).to.eventually.deep.equal({});
    });

  });

  describe('getAll', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(productsModel.getAll()).to.eventually.be.rejected;
    });

    it('deve retornas uma lista caso o connection.query retorne uma lista', () => {
      sinon.stub(mysql, 'execute').resolves([[]]);
      chai.expect(productsModel.getAll()).to.eventually.deep.equal([]);
    });
  });

  describe('exists', () => {
  it('deve disparar um erro caso o connection.query dispare um erro', () => {
    sinon.stub(mysql, 'execute').rejects();
    chai.expect(productsModel.exists(2)).to.eventually.be.rejected;
  });

  it('deve retornar false caso o connection.query retorne uma lista vazia', () => {
    sinon.stub(mysql, 'execute').resolves([[]]);
    chai.expect(productsModel.exists(2)).to.eventually.be.undefined;
  });

  it('deve retornar true caso o connection.query retorne um item na lista', () => {
    sinon.stub(mysql, 'execute').resolves([[{}]]);
    chai.expect(productsModel.exists(2)).to.eventually.deep.equal({});
  });
  });

  describe('remove', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(productsModel.remove(2)).to.eventually.be.rejected;
    });

    it('não deve ter retorno em caso de sucesso', () => {
      sinon.stub(mysql, 'execute').resolves();
      chai.expect(productsModel.remove(2)).to.eventually.be.undefined;
    });


  });

  describe('update', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(productsModel.update(2)).to.eventually.be.rejected;
    });

    it('não deve ter retorno em caso de sucesso', () => {
      sinon.stub(mysql, 'execute').resolves();
      chai.expect(productsModel.update(2)).to.eventually.be.undefined;
    });

  });

  describe('getByQuery', () => {
    it('deve disparar um erro caso o connection.query dispare um erro', () => {
      sinon.stub(mysql, 'execute').rejects();
      chai.expect(productsModel.getByQuery('Tênis do Flash')).to.eventually.be.rejected;
    });

    it('deve retornar uma lista caso o connection.query retorne uma lista', () => {
      sinon.stub(mysql, 'execute').resolves([[]]);
      chai.expect(productsModel.getByQuery('Tênis do Flash')).to.eventually.deep.equal([]);
    });
  });
});