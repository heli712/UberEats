const connection = require('../config/dbconfig')

var Checkout = function (checkout) {
    this.customerId = checkout.customerId,
    this.resturantId = checkout.resturantId,
    this.caddressId = checkout.caddressId,
    this.total = checkout.total,
    this.pickup = checkout.pickup,
    this.delivery = checkout.delivery,
    this.statusf = checkout.statusf
}

Checkout.add = function(checkout, result) {
    connection.query("INSERT INTO checkout SET ?", checkout, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res);
        }
    })
}

Checkout.show = function(resturantId, result) {
    connection.query("SELECT * FROM checkout JOIN orders ON checkout.orderId = orders.orderId WHERE resturantId = ?", resturantId, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res[0])
            result(null, res[0]);
        }
    })
}

Checkout.remove = function(customerId, result) {
    connection.query("DELETE FROM orders WHERE customerId = ?", customerId, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res);
        }
    })
}

module.exports = Checkout;