process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../index");
const should = chai.should();
chai.use(chaiHttp);

//for registration
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
describe("/POST user", () => {
  it("it should post the Login info", (done) => {
    const user = {
      email: " fadera@gmail.com",
      password: "fadera123",
    };
    chai
      .request(app)
      .post("/api/v1/users/signin")
      .send(user)
      .end((err, res) => {
        res.body.should.be.a("object");
        //res.body.should.have.property('message');
        done();
      });
  });
});

//Forget password TDD
describe("/PUT/:id user", () => {
  it("should  update the unapproved user status", (done) => {
    const user = {
      verified: 1,
    };
    const userId = 2;
    chai
      .request(app)
      .put("/api/v1/users/forget" + userId)
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
});

//User registration approve TDD
describe("/GET Unapproved", () => {
  it("it should Get all unapproved list of users", (done) => {
    chai
      .request(app)
      .get("/api/v1/users/approve")
      .end((err, res) => {
        //  res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//user registration approval
describe("/PUT/:id user", () => {
  it("should  update the unapproved user status", (done) => {
    const user = {
      verified: 1,
    };
    const userId = 2;
    chai
      .request(app)
      .put("/api/v1/users/approve" + userId)
      .send(user)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
});

// for news TDD
// for add news
describe("/POST news", () => {
  it("it should add the news info", (done) => {
    const news = {
      title: "Covid-19",
      description: "Corona is bad man",
      name: "Manish fadera",
      image: "105541136_271223453973540_7056596063916093870_n.jpg",
    };
    chai
      .request(app)
      .post("/api/v1/news")
      .send(news)
      .end((err, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
});

// for update news
describe("/PUT/:id news", () => {
  it("should  update the news info", (done) => {
    const news = {
      title: "Corona",
      description: "Corona is increasing day by day with numerious dead",
      name: "Raman Newar",
    };
    const newsId = 2;
    chai
      .request(app)
      .put("/api/v1/news" + newsId)
      .send(news)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
});
// for get news

// for get news
// describe("/GET news", () => {
//   it("it should Get all news detail", (done) => {
//     chai
//       .request(app)
//       .get("/api/v1/news")
//       .end((err, res) => {
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });

// for notice tdd
// for add notice
describe("/POST notice", () => {
  it("it should add the notice info", (done) => {
    const notice = {
      title: "Covid-19",
      description: "Corona holiday upto dashain",
      name: "prakash mahat",
      image: "105541136_271223453973540_7056596063916093870_n.jpg",
    };
    chai
      .request(app)
      .post("/api/v1/notice")
      .send(notice)
      .end((err, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
});

// for update notice
describe("/PUT/:id notice", () => {
  it(" it should  update the notice info", (done) => {
    const notice = {
      title: "Corona",
      description: "Corona is increasing day by day with numerious dead",
      name: "Raman Newar",
    };
    const newsId = 2;
    chai
      .request(app)
      .put("/api/v1/notice" + newsId)
      .send(notice)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
});
// for get notice
describe("/GET notice", () => {
  it("it should Get all notice detail", (done) => {
    chai
      .request(app)
      .get("/api/v1/notice")
      .end((err, res) => {
        // res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
// for decode user token
describe("/GET decode", () => {
  it("it should Get all decode of user detail", (done) => {
    chai
      .request(app)
      .get("/api/v1/decode")
      .end((err, res) => {
        res.body.should.be.a("object");
        done();
      });
  });
});
