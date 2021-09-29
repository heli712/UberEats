const Checkout = require('../models/checkout.model')

exports.Checkout = (req, res) => {
    const checkout = new Checkout({
        customerId: req.body.customerId,
        resturantId: req.body.resturantId,
        total: req.body.total,
        pickup: req.body.pickup,
        delivery: req.body.delivery,
        statusf: req.body.statusf,
        caddressId: req.body.caddressId,
        orderId: req.body.orderId,
    })
    Checkout.add(checkout, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else {
            console.log("jjnjdfr", data)
            res.json({
                message: "Order Placed",
                data: data
            })
        }
    })
}

exports.Checkout = (req, res) => {
    Checkout.show(req.body.resturantId, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else {
            console.log("checkout controller", data)
            res.send(data)
        }
    })
}

