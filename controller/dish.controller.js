const Dish = require('../models/dish.model')

//CREATE AND SAVE A NEW dish 
exports.create = (req, res) => {
    console.log("Inside the controlller......", req.body)
    //validate the request
    if(!req.body){
        res.status(400).send({
            message: "Enter the values properly..!!!"
        });
    }
    //CREATE dish 
    const dish = new Dish({
        dname: req.body.dname,
        resturantId: req.body.resturantId,
        ingredients: req.body.ingredients,
        price: req.body.price,
        veg: req.body.veg,
        nonVeg: req.body.nonVeg,
        vegan: req.body.vegan,        
    });
    console.log("Dish info", dish)
    // SAVE dish in the database
    Dish.create(dish, (err, data) => {
        if(err){
            res.status(500).send({
                message : err.message || "Some error occured while creating the customer"
            })
        }
        else {
            res.status(200).json({
                success: 1,
                results : data,
                message : "dish added"
            })
        }
    })
};

// Finding a dish 

exports.find = (req, res) => {

    Dish.find(req.body.name, (err, data) => {
        if(err){
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        else{
            console.log("dishes", data)
            res.json({
                success: 1,
                message : "dishes are here",
                dishes: data
            })
        }
    })
}

exports.findResturant = (req, res) => {
    console.log(req.body.rname);
    Dish.findResturant(req.body.rname, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        else{
            console.log("resturant",data)
            res.json({
                success : 1,
                message : "resturant are here",
                resturant: data
            })
        }
    })
}

exports.delDish = (req, res) => {
    console.log(req.body)
    Dish.delDish(req.body.resturantId, req.body.dname, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        else {
            console.log("response", data)
            res.json({
                success : 1,
                message : "dish deleted"
            })
        }
    })
}

exports.updateDetails = (req, res) => {
    const newDetails = {
        dname: req.body.dname,
        resturantId: req.body.resturantId,
        ingredients: req.body.ingredients,
        vegan: req.body.vegan,
        veg : req.body.veg,
        nonVeg: req.body.nonVeg,
        cusinieId: req.body.cusinieId,
        price: req.body.price,
        rdes: req.body.rdes,
    }
    Dish.updateDetails(newDetails, (err, data) => {
        if(err) {
            console.log(err);
            res.status(500).send({
                message : err.message
            })
        }
        else {
            console.log("dishes",data)
            res.json({
                success : 1,
                message : "updated successfully", 
                data: data
            })
        }
    })
}