process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../index");

const userModel = require("../models/UserModel");
const should = chai.should();
chai.use(chaiHttp);

describe("/POST user", () => {
  it("it should register the user info", (done) => {
    const user = {
      fullName: "Ram rai",
      address: "ktm",
      contactNumber: "9876543211",
      email: "ram@gmail.com",
      gender: "Male",
      attendance: "4",
      parentName: "shyam rai",
      parentAddress: "Ilam",
      parentContact: "1234567890",
      citizenshipNo: "8474747",
      userType: "Student",
      amount: "8474",
      password: "ram123",
      securityAnswer: "dog",
    };
    chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .end((err, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
});


//Login TDD 
describe('/POST user', () => {
  it('it should post the Login info', (done) => {
      const user = {
          email: " fadera@gmail.com",
          password: "fadera123"
         
      };
      chai.request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .end((err, res) => {
        
          res.body.should.be.a('object');
          //res.body.should.have.property('message');
          done();
      });
  });
});


//Forget password TDD
describe('/PUT/:id user', () => {
  it("should  update the unapproved user status", (done) => {
      const user = {
        verified: 1,
       
      }
      const userId = 2;
       chai.request(app)
       .put('/api/v1/users/forget'+ userId)
       .send(user)
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});


//User registration approve TDD
describe('/GET Unapproved', () => {
  it('it should Get all unapproved list of users', (done) => {
      chai.request(app)
      .get('/api/v1/users/approve')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
      });
  });
});


describe('/PUT/:id user', () => {
  it("should  update the unapproved user status", (done) => {
      const user = {
        verified: 1,
       
      }
      const userId = 2;
       chai.request(app)
       .put('/api/v1/users/approve'+ userId)
       .send(user)
       .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           done();
       });
  });
});