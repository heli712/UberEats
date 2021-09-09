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

module.exports = Customer;