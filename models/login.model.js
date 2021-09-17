const connection = require('../config/dbconfig')

var Customer = function (customer) {
    this.cname = customer.name;
    this.email = customer.email;
    this.pwd = customer.pwd;
};

Customer.create = function(newCus, result) {

    connection.query("INSERT INTO customer SET ?", newCus, function(err,res){
        if (err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.InsertId);
            result(null, res.InsertId);
        }
    })
}

Customer.find = function(email, result) {
    console.log(email);
    connection.query("SELECT * FROM customer WHERE email = ?", email, (err, res) => {
        if(err){
            console.log("error:", err);
            result(err, null);
        }
        if(res.length){
            console.log("Login Successfull:", res);
            result(null,res[0])
        } else {
            console.log("db mein kuch hai hi nai",res);
        result({kind: "not register"}, null);
        }
    })
}

Customer.findAll = function(result) {
    connection.query("SELECT * FROM customer", (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        if(res.length){
            console.log("get all user",res);
            result(null, res[0]);
        }
        console.log(res);
        result({kind:"authorization working"}, null)
    })
}

Customer.updateDetails = function(details, result) {
    console.log(details)
    connection.query("UPDATE customer SET cname = ?,DOB = ?, email = ?, mobileNo = ?, nickname = ?, about = ? WHERE customerId = ?",
        [details.cname, details.DOB, details.email, details.mobileNo, details.nickname, details.about, details.customerId ], (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log("result", res);
                result(null, res)
            }
        }  
    )
}

Customer.addpicture = function(customerId,Key, result) {
    console.log("In models",customerId)
    console.log("In models",Key)
    connection.query("UPDATE customer SET profilepic = ? WHERE customerId = ?", [Key, customerId], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res)
            result(null, res)
        }
    })
}

Customer.getpicture = function(customerId, result){
    console.log("in models", customerId)
    connection.query("SELECT profilepic FROM customer where customerId = ?", customerId, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res)
            result(null, res)
        }
    })
}
module.exports = Customer;