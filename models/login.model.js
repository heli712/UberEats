const connection = require('../config/dbconfig')

var Customer = function (customer) {
    this.cname = customer.name;
    this.email = customer.email;
    this.pwd = customer.pwd;
};

Customer.create = function(newCus, result) {

    connection.query("INSERT INTO customer SET ?", newCus, function(err,res){
        if(err){
            if (err.code == 'ER_DUP_ENTRY' ){
                result("Email already exists",null);
            }
        }
        else{
            console.log("----",res);
            result(null, res);
        }
    })
}

Customer.find = function(email, result) {
    // console.log(email);
    connection.query("SELECT * FROM customer WHERE email = ?", email, (err, res) => {
        if(err){
            console.log("error:", err);
            result(err, null);
        }
        if(res.length){
            // console.log("Login Successfull:", res[0]);
            result(null,res[0])
        } else {
            // console.log("db mein kuch hai hi nai",res);
            result(null, "not register");
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
    connection.query("UPDATE customer SET cname = ?,DOB = ?, email = ?, mobileNo = ?, nickname = ?, about = ?, city = ?, state = ?, country = ? WHERE customerId = ?",
        [details.cname, details.DOB, details.email, details.mobileNo, details.nickname, details.about, details.city, details.state, details.country, details.customerId,], (err, res) => {
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

Customer.findKey = function(customerId, result){
    console.log("in key models", customerId)
    connection.query("SELECT profilepic FROM customer where customerId = ?", customerId, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res[0])
            result(null, res[0])
        }
    })
}

Customer.address = function(caddressId,customerId, result) {
    console.log("in models", caddressId)
    connection.query("UPDATE customer SET caddressId = ? WHERE customerId = ?", [caddressId,customerId], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res);
        }
    })
}

module.exports = Customer;