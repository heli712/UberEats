const connection = require('../config/dbconfig')

var Orders = function (order) {
    this.dishId = order.dishId, 
    this.orderId = order.orderId,
    this.quantity = order.quantity
}

Orders.add = function(order, result) {
    connection.query("INSERT INTO orders SET ?", order, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res)
            result(null, res)
        }
    })
}

Orders.show = function(dishId, result) {
    connection.query("SELECT * FROM orders WHERE dishId = ?", dishId, (err, res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("result",res)
            result(null, res)
        }
    })
}

module.exports = Orders;
