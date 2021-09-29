const Cart = require('../models/cart.models')

exports.add = (req, res) => {
    const cart = new Cart({
        customerId: req.body.customerId,
        resturantId: req.body.resturantId,
        dishId: req.body.dishId,
        quantity: req.body.quantity,
    })
    Cart.add(cart, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }else {
            console.log("data",data);
            res.json({
                message: "success",
                data: data
            })
        }
    })
}

exports.show = (req, res) => {
    Cart.show(req.body.customerId, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        } else {
            console.log("data", data)
            res.send(data)
        }
    })
}

exports.remove = (req, res) => {
    Cart.remove(req.body.customerId, req.body.dishId, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else{
            console.log("data",data);
            res.json({
                message: "successfully removed",
                data: data
            })
        }
    })
}

exports.Cart = (req, res) => {
    const updateCart = {
        dishId: req.body.dishId,
        quantity: req.body.quantity,
        customerId: req.body.customerId,
        resturantId: req.body.resturantId
    }
    Cart.updateDish(updateCart, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else {
            console.log("data",data);
            res.json({
                message: "cart updated", 
                data: data
            })
        }
    })
}