const Resturant = require('../models/reslogin.model.js');
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');

//CREATE AND SAVE A NEW Resturant
exports.create = async (req, res) => {
    console.log("Inside the controlller......", req.body)
    //validate the request
    if(!req.body){
        res.status(400).send({
            message: "Enter the values properly..!!!"
        });
    }
    const password = req.body.pwd;
    var saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    //CREATE resturant 
    const resturant = await new Resturant({
        email: req.body.email,
        name: req.body.rname,
        pwd : encryptedPassword,
    });
    console.log("Resturant", resturant)
    // SAVE Resturant in the database
    Resturant.create(resturant, (err, data) => {
        if(err){
            res.status(500).send({
                message : err.message || "Some error occured while creating the customer"
            })
        }
        else {
            res.status(200).json({
                success: 1,
                results : data,
                message : "resturant added"
            })
        }
    })
};

exports.find = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Enter the values properly...!!!"
        })
    }
    //SELECT Resturant
    Resturant.find(req.body.email, async (err, data) => {
        console.log(req.body.email);
        console.log(req.body.pwd);
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        if(!data){
            return res.json({
                success : 0,
                message : "Invalid email or password"
            })
        }
        const result = await bcrypt.compare(req.body.pwd, data.pwd);
        if(result) {
            const accessToken = sign({ id: data}, "ubereats", {
                expiresIn: 86400 //24 hours
            })
            return res.json({
                success: 1,
                message : "login successfull",
                token: accessToken,
                name: data.rname,
                id: data.resturantId,
                email: data.email,
            })
            
        } else {
            return res.json({
                success : 0,
                message: "Invalid email or password"
            })
        }
    })
}

exports.findrKey = (req, res) => {
    console.log(req.body.resturantId)
    Resturant.findrKey(req.body.resturantId, (err,data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        else{
            console.log("controller key", data)
            res.json({
                key: data.profilepic
            })
        }
    })
}


exports.updateDetails = (req, res) => {
    const newDetails = {
        rname: req.body.rname,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        resturantId: req.body.resturantId,
        cdes: req.body.cdes,
        state: req.body.region,
        country: req.body.country,
        city: req.body.city,
        pickup: req.body.pickup,
        delivery: req.body.delivery,
        veg : req.body.veg,
        nonVeg: req.body.nonVeg,
        close: req.body.close,
        start: req.body.open,
        vegan: req.body.vegan,
        cuisineId: req.body.cuisine,
    }
    console.log("Resturant info", newDetails)
    Resturant.updateDetails(newDetails, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        else {
            console.log("====",data)
            res.json({
                success : 1,
                message : "Details updated"
            })
        }
    })
}



exports.findLocation = (req, res) => {
    console.log("inside controller",req.body)
    if(req.body.city == ''){
        console.log("here")
        Resturant.findAll( (err,data) => {
            if(err){
                console.log(err);
                res.status(500).send({
                    message : err.message
                })
            }
            else{
                console.log("response", data)
                res.send(data)
            }
        })
    }
    else {
        Resturant.findLocation(req.body.city, (err, data) => {
            if(err){
                console.log(err);
                res.status(500).send({
                    message : err.message
                })
            }
            else{
                console.log("response", data)
                res.send(data)
            }
        })
    }
}