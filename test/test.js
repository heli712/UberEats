const assert = require("chai").assert;
const index = require("../server");
const chai = require("chai");
chai.use(require("chai-http"));
const expect = require("chai").expect;
const agent = require("chai").request.agent(index);

describe("UberEats backend Testing", function (){


    describe("Login Test for customer", function () {
        it("Incorrect Password", () => {
          agent
            .post("/login")
            .send({ email: "swaroop07patwari@gmail.com", password: "password" })
            .then(function (res) {
              expect(res.text).to.equal('{"success":0,"message":"Not register"}');
            })
            .catch((error) => {
              console.log(error);
            });
        })
    
        it("Correct Password for customer", ()=>{
            agent
                .post("/login")
                .send({email: "heli@gmail.com" , password: "heli"})
                .then(function (res){
                    expect(res.text).to.equal('{"success":1,"message":}');
                })
                .catch((error) =>{
                    console.log(error);
                });
        })
    });

    describe("Login Test for restaurant", function () {
      it("Incorrect Password", () => {
        agent
          .post("/resturant/login")
          .send({ email: "swaroop07patwari@gmail.com", password: "password" })
          .then(function (res) {
            expect(res.text).to.equal('{"success":0,"message":"Not register"}');
          })
          .catch((error) => {
            console.log(error);
          });
      })
  
      it("Correct Password for restaurant", ()=>{
          agent
              .post("/resturant/login")
              .send({email: "honest@gmail.com" , password: "honest"})
              .then(function (res){
                  expect(res.text).to.equal('{"success":1,"message":}');
              })
              .catch((error) =>{
                  console.log(error);
              });
      })
  });
    
    describe("Signup Test for restaurant", function () {
      it("Correct Password", ()=>{
        agent
            .post("/resturant/register")
            .send({email: "pinktaco@gmail.com" , name:"Pink Taco", password: "pink"})
            .then(function (res){
                expect(res.text).to.equal('{"success":1,"message":"resturant added"}');
            })
            .catch((error) =>{
                console.log(error);
            });
        })
    
    });

    describe("Signup Test for customer", function () {
      it("Correct Password", ()=>{
        agent
            .post("/register")
            .send({email: "himesh@gmail.com" , name:"Himesh", password: "pink"})
            .then(function (res){
                expect(res.text).to.equal('{"success":1,"message":"customer added"}');
            })
            .catch((error) =>{
                console.log(error);
            });
        })
    
    });
    
    describe("Get Resturants", function(){
        it("Get resturant", () =>{
            agent 
                .post("/resturant/location")
                .send({city: "san jose"})
                .then(function (res){
                    expect(res.text).to.equal('{"message":"all resturant"}');
                })
                .catch((error) => {
                    console.log(error);
                  });
        })
    });
});


