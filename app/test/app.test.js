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
