const Checkout = require('../models/checkout.model')
const Address = require('../models/address.model');


exports.show = (req, res) => {
    Checkout.show(req.body.resturantId, req.body.status, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else {
            console.log("checkout controller", data)
            res.send(data);
        }
    })
}

exports.delivery = (req, res) => {
    Address.delivery(req.body.caddressId, (err, cdata)=>{
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else{
            console.log("address adn customer", cdata)
            res.send(
             cdata
            )
        }
    })
}

exports.showdish = (req, res) => {
    Checkout.showdish(req.body.checkoutId, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else{
            console.log("showing dishes", data)
            res.send(data)
        }
    })
}

exports.status = (req, res) => {
    Checkout.status(req.body.checkoutId, req.body.statusf, (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else{
            console.log("showing status",data)
            res.send({
                message:"status updated"
            })
        }
    })
}

exports.showstatus = (req, res) => {
    Checkout.showstatus(req.body.checkoutId, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        } else {
            console.log("showing status",data)
            res.send(data)
        }
    })
}

exports.pasto = (req, res) => {
    var mode = ''
    if(req.body.mode == 'Delivery'){
        mode = 'Yes'
        Checkout.pasto(req.body.customerId, mode, req.body.status, (err, data) => {
            if(err){
                console.log(err);
                res.send({
                    message: "Somer error occured" || err.message
                })
            }
            else {
                console.log("showing past orders", data)
                res.send(data)
            }
        })
    }
    if(req.body.mode == 'Pickup') {
        mode = 'Yes'
        Checkout.pastp(req.body.customerId, mode,req.body.status, (err, data) => {
            if(err){
                console.log(err);
                res.send({
                    message: "Somer error occured" || err.message
                })
            }
            else {
                console.log("showing past orders", data)
                res.send(data)
            }
        })
    }
    
}

exports.pastorders = (req, res) => {
    console.log("showing", req.body)
    Checkout.pastorders(req.body.checkoutId, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        } else {
            console.log("past orders",data)
            res.send(data)
        }
    })
}