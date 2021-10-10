const request = require('request');
const chai = require('chai');
const chaiHttp = require('chai-http') 
const expect = require('chai').expect;

chai.should()
chai.use(chaiHttp);


let app;
describe('Login API', function() {
    before((done) => {
            app = require('../server');
            done();
      });
    const data = {
        email : 'heli@gmail.com', 
        password: 'heli'
    }
    it('Should success if credential is valid', function(done) {
        this.timeout(100);
        chai.request(app)
           .post('/login')
           .send(data)
           .end((err, res) => {
            if (err) {
              console.log(err);
            } else {
              res.should.have.status(200);
              res.body.should.have.property('token');
            }
            done();
          });
    }); 
});

