
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);
describe('Check connection to Local Host', () => {
    it('It should connect successfully', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});
describe('Check Functionalities', () => {
    it('/showOrders must return [] when there is no input', (done) => {
        chai.request(server)
            .get('/showOrders')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });
});

