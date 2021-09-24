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