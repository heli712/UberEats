const Customer = require('../models/login.model.js');
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken');
const Address = require('../models/address.model');

//CREATE AND SAVE A NEW CUSTOMER
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
    //CREATE customer 
    const customer = await new Customer({
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

exports.find = async (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Enter the values properly...!!!"
        })
    }
    //SELECT Customer
    Customer.find(req.body.email, async  (err, data) => {
        console.log(req.body.email);
        console.log(req.body.pwd);
        if(!data){
            return res.json({
                success : 0,
                message : "Not register"
            })
        }
        console.log("here---",data)
        console.log(data.pwd)
        console.log(req.body.pwd)
        const result = await bcrypt.compare(req.body.pwd, data.pwd);
       console.log("=====",result);
        if(result) {
            const accessToken = sign({ id: data}, "ubereats", {
                expiresIn: 86400 //24 hours
            })
            return res.json({
                success: 1,
                message : "login successfull",
                token: accessToken,
                name: data.cname,
                id: data.customerId,
                email: data.email,
                details: data
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

exports.findKey = (req, res) => {
    console.log(req.body.customerId)
    Customer.findKey(req.body.customerId, (err,data) => {
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
        cname: req.body.cname,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        DOB: req.body.DOB,
        nickname: req.body.nickname,
        customerId: req.body.customerId,
        about: req.body.about,
        city : req.body.city,
        country: req.body.country,
        state : req.body.region
    }
    Customer.updateDetails(newDetails, (err, data) => {
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

exports.address= (req, res) => {
    console.log(req.body);
    const newAdd = {
        customerId: req.body.customerId,
        city: req.body.city,
        country: req.body.country,
        state: req.body.region,
    }
    Customer.address(newAdd, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        } else {
            console.log("====", data)
            res.json({
                success : 1,
                message : "address updateDated"
            })
        }
    })
}

exports.add = (req, res) => {
    const caddress = new Address({
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        customerId: req.body.customerId,
        street: req.body.street
    })
    Address.add(caddress, (err, data)=> {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else {
            console.log("controller address", data) 
            res.json({
                message: "Address added", 
                data: data
            })
        }
    })
}

exports.show = (req, res) => {
    Address.show(req.body.customerId, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message || "Some error occured"
            })
        }
        else {
            console.log("constroller", data)
            res.send(data)
        }
    })
}