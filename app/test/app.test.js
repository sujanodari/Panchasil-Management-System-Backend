process.env.NODE_ENV = "test";

var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../index");
const fees = require("../models/feeModel");
//const { getUserByEmail } = require("../controllers/feeController");
const should = chai.should();
chai.use(chaiHttp);

//for registration
// describe("/POST user", () => {
//   it("it should register the user info", (done) => {
//     const user = {
//       fullName: "lok gautam",
//       address: "ktm",
//       contactNumber: "9876543211",
//       email: "lok@gmail.com",
//       gender: "Male",
//       attendance: "4",
//       parentName: "shyam rai",
//       parentAddress: "Ilam",
//       parentContact: "1234567890",
//       citizenshipNo: "8474747",
//       userType: "Student",
//       amount: "8474",
//       password: "lok1234",
//       securityAnswer: "dog",
//     };
//     chai
//       .request(app)
//       .post("/api/v1/users/signup")
//       .send(user)
//       .end((err, res) => {
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });

// //Login TDD
// describe("/POST user", () => {
//   it("it should post the Login info", (done) => {
//     const user = {
//       email: " admin@gmail.com",
//       password: "admin1234",
//     };
//     chai
//       .request(app)
//       .post("/api/v1/users/signin")
//       .send(user)
//       .end((err, res) => {
//         res.body.should.be.a("object");
//         //res.body.should.have.property('message');
//         done();
//       });
//   });
// });

// //Forget password TDD
// describe("/PUT/:id user", () => {
//   it("should  update the unapproved user status", (done) => {
//     const user = {
//       verified: 1,
//     };
//     const userId = 2;
//     chai
//       .request(app)
//       .put("/api/v1/users/forget" + userId)
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });

// //User registration approve TDD
// describe("/GET Unapproved", () => {
//   it("it should Get all unapproved list of users", (done) => {
//     chai
//       .request(app)
//       .get("/api/v1/users/approve")
//       .end((err, res) => {
//         //  res.should.have.status(200);
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });

// //user registration approval
// describe("/PUT/:id user", () => {
//   it("should  update the unapproved user status", (done) => {
//     const user = {
//       verified: 1,
//     };
//     const userId = 2;
//     chai
//       .request(app)
//       .put("/api/v1/users/approve" + userId)
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });

// // for news TDD
// // for add news
// describe("/POST news", () => {
//   it("it should add the news info", (done) => {
//     const news = {
//       title: "Covid-19",
//       description: "Corona is bad man",
//       name: "Manish fadera",
//       image: "105541136_271223453973540_7056596063916093870_n.jpg",
//     };
//     chai
//       .request(app)
//       .post("/api/v1/news")
//       .send(news)
//       .end((err, res) => {
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });

// // for update news
// describe("/PUT/:id news", () => {
//   it("should  update the news info", (done) => {
//     const news = {
//       title: "Corona",
//       description: "Corona is increasing day by day with numerious dead",
//       name: "Raman Newar",
//     };
//     const newsId = 2;
//     chai
//       .request(app)
//       .put("/api/v1/news" + newsId)
//       .send(news)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });
// // for get news

// // for get news
// // describe("/GET news", () => {
// //   it("it should Get all news detail", (done) => {
// //     chai
// //       .request(app)
// //       .get("/api/v1/news")
// //       .end((err, res) => {
// //         res.body.should.be.a("object");
// //         done();
// //       });
// //   });
// // });

// // for notice tdd
// // for add notice
// describe("/POST notice", () => {
//   it("it should add the notice info", (done) => {
//     const notice = {
//       title: "Covid-19",
//       description: "Corona holiday upto dashain",
//       name: "prakash mahat",
//       image: "105541136_271223453973540_7056596063916093870_n.jpg",
//     };
//     chai
//       .request(app)
//       .post("/api/v1/notice")
//       .send(notice)
//       .end((err, res) => {
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });

// // for update notice
// describe("/PUT/:id notice", () => {
//   it(" it should  update the notice info", (done) => {
//     const notice = {
//       title: "Corona",
//       description: "Corona is increasing day by day with numerious dead",
//       name: "Raman Newar",
//     };
//     const newsId = 2;
//     chai
//       .request(app)
//       .put("/api/v1/notice" + newsId)
//       .send(notice)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });
// // for get notice
// describe("/GET notice", () => {
//   it("it should Get all notice detail", (done) => {
//     chai
//       .request(app)
//       .get("/api/v1/notice")
//       .end((err, res) => {
//         // res.should.have.status(200);
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });
// // for decode user token
// describe("/GET decode", () => {
//   it("it should Get all decode of user detail", (done) => {
//     chai
//       .request(app)
//       .get("/api/v1/decode")
//       .end((err, res) => {
//         res.body.should.be.a("object");
//         done();
//       });
//   });
// });


// //token for authorization
// var Token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1OTM2ODY4MDd9.EfYymfVaDX_cj4P6JObV0Y6Qo4d-FkpkorUGw3EhfCg";



// // for Subject TDD
// // for add subject
// describe("Subject",function(){
//   describe("/POST Add subjects", () => {
//     it("it should add the subject,, provided token is authorized", (done) => {
//       const subjects = {
//         subjectName: "Maths"
//       };
//       chai
//         .request(app)
//         .post("/api/v1/subjects")
//         .set("Authorization",Token)
//         .send(subjects)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.have.property("message").eql("Subject  added");
//           done();
//         });
//     });
//   });
//   });

  

// // for Subject TDD
// // for getall subject
// describe("Subject",function(){
//   describe("/GET Get subjects", () => {
//     it("it should get the subject, provided token is authorized", (done) => {
//       chai
//         .request(app)
//         .get("/api/v1/subjects")
//         .set("Authorization",Token)
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
//   });
  
// // for Subject TDD
// // for delete subject
// describe("Subject",function(){
//   describe("/DELETE  subjects", () => {
//     it("it should Delete the subject, subject id and provided token is authorized", (done) => {
//       const subjects = {
//         subjectName: "Science"
//       };
//       var id= 1;
//       chai
//         .request(app)
//         .delete("/api/v1/subjects/"+id)
//         .set("Authorization",Token)
//         .end((err, res) => {
//           res.should.have.status(204);
//           res.body.should.have.property("message").eql("Subject Deleted successfully!");
//           done();
//         });
//     });
//   });
//   });


  

//   //////////////////
//   // for Subject TDD
// // for add subject
// describe("Subject Class",function(){
//   describe("/POST Add subjects for Clss", () => {
//     it("it should add the subject for class, provided token is authorized", (done) => {
//       const subjects = {
//         subId:2,
//         classId:1
//       };
//       chai
//         .request(app)
//         .post("/api/v1/subjectsClass")
//         .set("Authorization",Token)
//         .send(subjects)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.have.property("message").eql("Subject added for class");
//           done();
//         });
//     });
//   });
//   });

  

// // for Subject TDD
// // for getall subject
// describe("Subject Class",function(){
//   describe("/GET Get subjects of class", () => {
//     it("it should get the subject form, provided token is authorized", (done) => {
//       chai
//         .request(app)
//         .get("/api/v1/subjectsClass")
//         .set("Authorization",Token)
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
//   });
  
// // for Subject TDD
// // for delete subject
// describe("Subject Class",function(){
//   describe("/DELETE  subjects class", () => {
//     it("it should Delete the subject for class, subject id and provided token is authorized", (done) => {
//       const subjects = {
//         subjectName: "Science"
//       };
//       var id= 1;
//       chai
//         .request(app)
//         .delete("/api/v1/subjectsClass/"+id)
//         .set("Authorization",Token)
//         .end((err, res) => {
//           res.should.have.status(204);
//           res.body.should.have.property("message").eql("Subject Deleted successfully!");
//           done();
//         });
//     });
//   });
//   });
// //get subject ID from class id
// describe("Subject Class",function(){
//   describe("/GET Get subjects id for students of class", () => {
//     it("it should get the subject id form, provided token is authorized", (done) => {
//       var id= 5;
//       chai
//         .request(app)
//         .get("/api/v1/student/subject/"+id)
//         .set("Authorization",Token)
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
//   });
  


//const Token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzdWphbkBnbWFpbC5jb20iLCJpYXQiOjE1OTUxNDM5NDV9.TwradLndCqPMaLhMmWStAiG-uQXf9JVbdCTyOOvce_o'
//for add class

// describe("/Add Class", () => {

//   it("it should Add the class if token provided", (done) => {
//     const classes = {
//       section: 'B',
//       class:'1'
//     };
    
//     chai
//       .request(app)
//       .post("/api/v1/class")
//       .set("Authorization",Token)
//       .send(classes)
//       .end((err, res) => {
//         res.should.have.status(201);
//         done();
//       });
//   });
// });

// // for getall classes

  // describe("/GET Get Classes", () => {
  //   it("it should get the class, provided token is authorized", (done) => {
  //     chai
  //       .request(app)
  //       .get("/api/v1/class")
  //       .set("Authorization",Token)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         done();
  //       });
  //   });
  // });



//get student class

  // describe("/Get Student's Class ", () => {
  //   it("it should get the class of  a student, provided token is authorized and student already enrolled in class", (done) => {

  //     var id=2
  //     chai
  //       .request(app)
  //       .get("/api/v1/class/student/"+id)
  //       .set("Authorization",Token)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         done();
  //       });
  //   });
  // });

  //delete class

  // describe("/Delete a class ", () => {
  //   it("it should delete a class, provided token is authorized and class is there already", (done) => {

  //     var id=16
  //     chai
  //       .request(app)
  //       .delete("/api/v1/class/"+id)
  //       .set("Authorization",Token)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         done();
  //       });
  //   });
  // });


  //get all enrolls

  // describe("/GET Get All enrolls", () => {
  //   it("it should get the enrolls, provided token is authorized", (done) => {
  //     chai
  //       .request(app)
  //       .get("/api/v1/enroll")
  //       .set("Authorization",Token)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         done();
  //       });
  //   });
  // });


  //enroll a student

  // describe("/Enroll a student", () => {

  //   it("it should Enroll student in a class if token is authorized and student id exist and if class exist", (done) => {
  //     const abc= {
  //       id:5,
  //       class:6,
  //       section:'A',
  //       year:'2020-07-04 00:00:00'
  //     }
      
  //     chai
  //       .request(app)
  //       .post("/api/v1/enroll/"+abc.id)
  //       .set("Authorization",Token)
  //       .send(abc)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         done();
  //       });
  //   });
  // });


  //delete a enroll

  // describe("/Delete a enroll ", () => {
  //   it("it should delete a enroll, provided token is authorized and enroll is there already", (done) => {

  //     var id=3
  //     chai
  //       .request(app)
  //       .delete("/api/v1/enroll/"+id)
  //       .set("Authorization",Token)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         done();
  //       });
  //   });
  // });
  

  //get student subject

  // describe("/GET Get Student Subject", () => {
  //   it("it should get student subject, provided token is authorized is student id exist", (done) => {
  //    var id=3
  //     chai
  //       .request(app)
  //       .get("/api/v1/student/subject/"+id)
  //       .set("Authorization",Token)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         done();
  //       });
  //   });
  // });

  // // for Search TDD

// describe("Search",function(){
//   describe("/GET  search", () => {
//     it("it should search the subject, subject id and provided token is authorized", (done) => {
//       const searchs = {
//         name: "Prabin"
//       };
     
//       chai
//         .request(app)
//         .get("/api/v1/search")
//            .send (searchs)
//         .set("Authorization",Token)
//         .end((err, res) => {
//           res.should.have.status(200);
          
//           done();
//         });
//     });
//   });
//   });


  // describe("Fee",function(){

  //   describe("/Post  fee", () => {
  //     it("it should add fee if provided token is authorized", (done) => {
  //       const fees = {
  //        fullName: "Sujan Odari",
  //        class: "1",
  //        section: "A",
  //        tuition: 2000,
  //        eca: 100,
  //        trans: 2000,
  //        examfee: 200,
  //        lastdue: 150
  //       };
       
  //       chai
  //         .request(app)
  //         .post("/api/v1/fees")
  //            .send (fees)
  //         .set("Authorization",Token)
  //         .end((err, res) => {
  //           res.should.have.status(201);
            
  //           done();
  //         });
  //     });
  //   });

  //   describe("/get  fee", () => {
  //     it("it should get fee and provided token is authorized", (done) => {
       
  //       chai
  //         .request(app)
  //         .get("/api/v1/fees")
  //         .set("Authorization",Token)
  //         .end((err, res) => {
  //           res.should.have.status(201);
            
  //           done();
  //         });
  //     });
  //   });

  //   describe("/get  fee by id", () => {
  //     it("it should get fee, id is provided and provided token is authorized", (done) => {
  //      var id=1;
  //       chai
  //         .request(app)
  //         .get("/api/v1/fees/"+id)
  //         .set("Authorization",Token)
  //         .end((err, res) => {
  //           res.should.have.status(201);
  //           done();
  //         });
  //     });
  //   });


  //   describe("/update  class fee by id", () => {
  //     it("it should update fee, id is provided and provided token is authorized", (done) => {
  //      var userId=1;
  //      const fee = {
  //       eca: 100,
  //       trans: 2000,
  //       tuition: 3000
  //      };
      
  //       chai
  //         .request(app)
  //         .put("/api/v1/fee/"+userId)
  //         .send(fee)
  //         .set("Authorization",Token)
  //         .end((err, res) => {
  //           res.should.have.status(201);
  //           done();
  //         });
  //     });
  //   });
    
  // });
  
  // describe("Attendence",function(){


  //   describe("/add  student attendence by id", () => {
  //     it("it should add attendence, studentId is provided and provided token is authorized", (done) => {
  //      var studentId=1;
  //       chai
  //         .request(app)
  //         .put("/api/v1/users/add/attendence/"+studentId)
  //         .set("Authorization",Token)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           done();
  //         });
  //     });
  //   });



  //   describe("/sub  student attendence by id", () => {
  //     it("it should sub attendence, studentId is provided and provided token is authorized", (done) => {
  //      var studentId=1;
  //       chai
  //         .request(app)
  //         .put("/api/v1/users/sub/attendence/"+studentId)
  //         .set("Authorization",Token)
  //         .end((err, res) => {
  //           res.should.have.status(200);
  //           done();
  //         });
  //     });
  //   });

// var studenttoken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzdWphbkBnbWFpbC5jb20iLCJpYXQiOjE1OTUxNDM5NDV9.TwradLndCqPMaLhMmWStAiG-uQXf9JVbdCTyOOvce_o"

//   describe("/get fee using token", () => {
//         it("it should get student fee,  provided token is authorized", (done) => {
          
        
//           chai
//             .request(app)
//             .get("/api/v1/fee" )
            
//             .set("Authorization",studenttoken)
//             .end((err, res) => {
//               res.should.have.status(201);
//               done();
//             });
//         });
//       });
      
var Token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1OTUxNTgyNTd9.eMXZiwFg-S_ZCS_Wr2USkIZV4xRmqYfL_Ku7kznLDRY"

 describe("Fee",function(){

    describe("/Post  fee", () => {
      it("it should add fee if provided token is authorized", (done) => {
        const fees = {
         fullName: "Sujan Odari",
         class: "1",
         section:"A",
         email:"sujan@gmail.com",
         eca: 100,
         trans: 2000,
         tuition: 3000,
          examfee: 200,
         lastdue: 150
        };
       
        chai
          .request(app)
          .post("/api/v1/fees")
             .send (fees)
          .set("Authorization",Token)
          .end((err, res) => {
            res.should.have.status(201);
            
            done();
          });
      });
    });
  });
 
  describe("Question", function () {
    describe("/Post  question", () => {
      it("it should add question if provided token is authorized", (done) => {
        const question = {
          class: "2",
          section: "A",
          Exam_type: "unitTest2",
          ExamDate: "2020/7/27",
          questionBank: "myImage-1595660100900.docx",
        };
  
        chai
          .request(app)
          .post("/api/v1/question")
          .send(question)
          .set("Authorization", Token)
          .end((err, res) => {
            res.should.have.status(200);
  
            done();
          });
      });
    });
  });
  

  //for Notice Update
describe("/PUT/:id notice", () => {
  it(" it should  update the notice info", (done) => {
    const notice = {
      title: "School",
      description:
        "School reopen from coming sunday",
      name: "Greatly Phadera",
    };
    const noticeId = 3;
    chai
      .request(app)
      .put("/api/v1/notice/" + noticeId)
      .set("Authorization", Token)
      .send(notice)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//for notice image Update
describe("/PUT/:id notice", () => {
  it(" it should  update the notice image", (done) => {
    const image = {
      image: "myImage-1593414475992.png",
    };
    const noticeId = 2;
    chai
      .request(app)
      .patch("/api/v1/notice/" + noticeId)
      .set("Authorization", Token)
      .send(image)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//for News Update
describe("/PUT/:id news", () => {
  it(" it should  update the news info", (done) => {
    const news = {
      title: "Corona",
      description: "Whole Nepal will be banda",
      name: "RM Fadera",
    };
    const newsId = 2;
    chai
      .request(app)
      .put("/api/v1/news/" + newsId)
      .set("Authorization", Token)
      .send(news)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//for news image Update
describe("/PUT/:id news", () => {
  it(" it should  update the news image", (done) => {
    const image = {
      image: "myImage-1593414475992.png",
    };
    const newsId = 3;
    chai
      .request(app)
      .patch("/api/v1/news/" + newsId)
      .set("Authorization", Token)
      .send(image)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//for class Update
describe("/PUT/:id class", () => {
  it(" it should  update the class info", (done) => {
    const classes = {
      class: "1",
      section: "D",
      tuition: "2000",
      eca: "1000",
      trans: "500",
    };
    const classesId = 2;
    chai
      .request(app)
      .put("/api/v1/class/" + classesId)
      .set("Authorization", Token)
      .send(classes)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//for subject Update
describe("/PUT/:id subject", () => {
  it(" it should  update the subject info", (done) => {
    const subject = {
      subjectName: "Science",
    };
    const subId = 2;
    chai
      .request(app)
      .put("/api/v1/class/" + subId)
      .set("Authorization", Token)
      .send(subject)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//for user Update
describe("/PUT/:id user", () => {
  it(" it should  update the user info", (done) => {
    const user = {
      fullName: "lokendra",
      address: "ktm",
      contactNumber: "9876543211",
      email: "lok@gmail.com",
      gender: "Male",
      attendance: "4",
      parentName: "shyam rai",
      parentAddress: "Ilam",
      parentContact: "1234567890",
      citizenshipNo: "8474747",
      userType: "Student",
      amount: "8474",
      password: "lok1234",
      securityAnswer: "dog",
    };
    const userId = 3;
    chai
      .request(app)
      .put("/api/v1/users/" + userId)
      .set("Authorization", Token)
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//for user image Update
describe("/PUT/:id user", () => {
  it(" it should  update the user image", (done) => {
    const image = {
      image: "myImage-1593414475992.png",
    };
    const userId = 2;
    chai
      .request(app)
      .patch("/api/v1/users/" + userId)
      .set("Authorization", Token)
      .send(image)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
