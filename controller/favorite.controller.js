const Favorite = require('../models/favorite.model.js');

exports.addf = async (req, res) => {
    const fvrt = new Favorite({
        customerId: req.body.customerId,
        resturantId: req.body.resturantId,
    })
    Favorite.addf(fvrt , (err, data) => {
        if(err){
            res.status(500).send({
                message : err.message || "Some error occured while creating the customer"
            })
        }
        else {
            res.send(data)
        }
    })
}

exports.removef = async (req, res) => {
    console.log(req.body)
    Favorite.removef(req.body.customerId, req.body.resturantId, (err, data) => {
        if(err){
            res.status(500).send({
                message : err.message || "Some error occured while creating the customer"
            })
        }
        else{
            res.send(data)
        }
    })
}

exports.show = async (req, res) => {
    Favorite.show(req.body.customerId, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured while creating the customer"
            })
        }
        else{
            res.send(data)
        }
    })
}

exports.check = async (req, res) => {
    console.log("msmdoiw",req.body.customerId)
    Favorite.check(req.body.customerId, req.body.restaurantId, (err, data)=>{
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        console.log("lenght", data.length)
        if(data.length == 1){
            res.send("success")
        } if(data.length== 0){
            res.send("failed")
        }
    })
}