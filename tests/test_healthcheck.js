const chai = require('chai');
const chaiHttp = require('chai-http');
const app = 'http://localhost:3000'; // Change if deployed

chai.use(chaiHttp);
const { expect } = chai;

describe('Health Check', () => {
  it('should return 200 status with "OK" message', (done) => {
    chai.request(app)
      .get('/api/health')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ status: 'OK' });
        done();
      });
  });
});