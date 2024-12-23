const chai = require('chai');
const chaiHttp = require('chai-http');
const app = 'http://localhost:3000'; // Change if deployed

chai.use(chaiHttp);
const { expect } = chai;

describe('User Management', () => {
  it('should create a new user', (done) => {
    chai.request(app)
      .post('/api/users')
      .send({ id: '1', name: 'John Doe', email: 'john@example.com' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.user).to.include({ id: '1', name: 'John Doe', email: 'john@example.com' });
        done();
      });
  });

  it('should get all users', (done) => {
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').with.lengthOf(1);
        done();
      });
  });

  it('should get a user by ID', (done) => {
    chai.request(app)
      .get('/api/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.include({ id: '1', name: 'John Doe', email: 'john@example.com' });
        done();
      });
  });

  it('should update a user by ID', (done) => {
    chai.request(app)
      .put('/api/users/1')
      .send({ name: 'Jane Doe' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.user).to.include({ name: 'Jane Doe' });
        done();
      });
  });

  it('should delete a user by ID', (done) => {
    chai.request(app)
      .delete('/api/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.include({ message: 'User deleted' });
        done();
      });
  });
});