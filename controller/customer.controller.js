const Customer = require('../models/login.model.js');
const connection = require('../config/dbconfig');
//CREATE AND SAVE A NEW CUSTOMER
exports.create = (req, res) => {
    //validate the request
    if(!req.body){
        res.status(400).send({
            message: "Enter the values properly..!!!"
        });
    }

    //CREATE customer 
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        pwd : req.body.pwd,
    });

    // SAVE CUSTOMER in the database
    Customer.create(customer, (err, data) => {
        if(err){
            res.status(500).send({
                message : err.message || "Some error occured while creating the customer"
            })
        }
        else {
            res.send(data);
        }
    })
};
