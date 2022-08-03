const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const Joi = require('joi');
const { runSchema } = require('../../../middlewares/validators');

chai.use(chaiAsPromised);

describe('middlewares/validators', () => {

  beforeEach(sinon.restore);

  const schema = Joi.object();

  describe('runSchema', () => {
    it('deve disparar um erro caso o joi dispare um erro', () => {
      sinon.stub(schema, 'validateAsync').rejects();
      chai.expect(runSchema(schema)({})).to.eventually.be.rejected;
    });

    it('deve disparar um erro caso o joi dispare um erro', () => {
      sinon.stub(schema, 'validateAsync').resolves();
      chai.expect(runSchema(schema)({})).to.eventually.deep.equal({});
    });
  });
});