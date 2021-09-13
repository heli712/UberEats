const Customer = require('../models/login.model.js');
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');

//CREATE AND SAVE A NEW CUSTOMER
exports.create = (req, res) => {
    console.log("Inside the controlller......", req.body)
    //validate the request
    if(!req.body){
        res.status(400).send({
            message: "Enter the values properly..!!!"
        });
    }
    const password = req.body.pwd;
    var saltRounds = 10;
    const encryptedPassword = bcrypt.hash(password, saltRounds)
    //CREATE customer 
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        pwd : encryptedPassword,
    });

    // SAVE CUSTOMER in the database
    Customer.create(customer, (err, data) => {
        if(err){
            res.status(500).send({
                message : err.message || "Some error occured while creating the customer"
            })
        }
        else {
            res.status(200).json({
                success: 1,
                results : data,
                message : "customer added"
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
    //SELECT Customer
    Customer.find(req.body.email,  (err, data) => {
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
        const result = bcrypt.compare(req.body.pwd, data.pwd);
        if(result) {
            const accessToken = sign({ id: data}, "ubereats", {
                expiresIn: 86400 //24 hours
            })
            return res.json({
                success: 1,
                message : "login successfull",
                token: accessToken
            })
            
        } else {
            return res.json({
                success : 0,
                message: "Invalid email or password"
            })
        }
    })
}

exports.findAll = (req, res) => {
    Customer.findAll((err,data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        if(data){
            res.json({
                message : "Authorization is working"
            })
        }
    })
}

exports.updateDetails = (req, res) => {
    newDetails = {
        mobileNo : req.body.mobileNo,
        
    }
    Customer.updateDetails(newDetails, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        if(data) {
            res.json({
                success : 1,
                message : "Details updated"
            })
        }
    })
}