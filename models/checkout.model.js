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
    connection.query("SELECT * FROM checkout WHERE resturantId = ?", resturantId, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res)
            result(null, res);
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
Checkout.showdish = function(checkoutId, result) {
    connection.query("SELECT d.*,o.quantity FROM dish d JOIN orders o ON o.dishId = d.dishId JOIN checkout c ON o.checkoutId = c.checkoutId WHERE o.checkoutId = ?", checkoutId, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res);
            result(null, res);
        }
    })
}

Checkout.status = function(checkoutId, state, result){
    connection.query("UPDATE checkout SET statusf = ? where checkoutId = ?", [state,checkoutId], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result", res);
            result(null, res);
        }
    })
}

Checkout.showstatus = function(checkoutId, result) {
    connection.query("SELECT statusf FROM checkout WHERE checkoutId = ? ", checkoutId, (err, res) => {
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

    Checkout.pasto = function(customerId, result) {
        connection.query("SELECT c.*, r.rname FROM checkout c JOIN resturant r ON c.resturantId = r.resturantId WHERE customerId = ?", customerId, (err, res)=> {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                console.log("result", res)
                result(null, res)
            }
        })
    }


Checkout.pastorders = function(customerId, resturantId, result) {
    connection.query("SELECT d.*, o.quantity,c.statusf, c.total, r.rname, a.street, a.city, a.state, a.country FROM dish d JOIN resturant r ON d.resturantId = r.resturantId JOIN orders o ON o.dishId = d.dishId JOIN checkout c ON o.checkoutId = c.checkoutId JOIN caddress a ON c.caddressId = a.caddressId WHERE c.customerId = ? and c.resturantId = ?", [customerId, resturantId], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("result", res)
            result(null, res)
        }
    })
}
module.exports = Checkout;