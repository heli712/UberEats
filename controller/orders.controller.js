const Orders = require('../models/order.models')
const Checkout = require('../models/checkout.model')
const Cart = require('../models/cart.models')

exports.add = (req, res) => {
    console.log(req.body.dishes)
    console.log(req.body.customerId)
    console.log(req.body.resturantId);
    var total = 0 ;
    req.body.dishes.forEach(element => {
        console.log(element.price);
        total = total + element.price * element.quantity + element.price*0.1
    });
    console.log("total", total)
    const check = new Checkout({
        customerId: req.body.customerId,
        resturantId: req.body.resturantId,
        caddressId: req.body.caddressId,
        statusf: "Order placed",
        total: total,
        delivery: req.body.delivery,
        pickup: req.body.pickup
    })
    Checkout.add(check, (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        else {
            console.log("checkout id", data.insertId);
            req.body.dishes.forEach(element => {
                element.checkoutId = data.insertId
            })
            console.log("inside controller", req.body.dishes)
            Orders.add(req.body.dishes, (err, data)=> {
                if(err){
                    console.log(err);
                    res.status(500).send({
                        err: err.message
                    })
                }
                else {
                    console.log("______", data);
                    res.send({ 
                        totol: total,
                        message : "Order placed",
                        data: data
                    });
                }
            })
        }
    })
    
}