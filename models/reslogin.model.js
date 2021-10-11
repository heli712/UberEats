const connection = require('../config/dbconfig')

var Resturant = function (resturant) {
    this.rname = resturant.name;
    this.email = resturant.email;
    this.pwd = resturant.pwd;
};

Resturant.create = function(newRes, result) {

    connection.query("INSERT INTO resturant SET ?", newRes, function(err,res){
        if (err){
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    })
}

Resturant.find = function(email, result) {
    // console.log(email);
    connection.query("SELECT * FROM resturant WHERE email = ?", email, (err, res) => {
        if(err){
            console.log("error:", err);
            result(err, null);
        }
        if(res.length){
            // console.log("Login Successfull:", res);
            result(null,res[0])
        } else {
            // console.log("db mein kuch hai hi nai",res);
            result(null, "not register");
        }
    })
}

Resturant.updateDetails = function(details, result) {
    console.log(details)
    connection.query("UPDATE resturant SET rname = ?, email = ?, mobileNo = ?, cdes = ?, nonVeg = ?, veg = ?, delivery = ?, pickup = ?, start = ?, close = ?, vegan = ?, city = ?, state = ?, country = ?, cuisineId = ?, street = ?  WHERE resturantId = ?",
        [details.rname, details.email, details.mobileNo, details.cdes, details.nonVeg, details.veg, details.delivery, details.pickup, details.start, details.close, details.vegan, details.city, details.state, details.country, details.cuisineId, details.street, details.resturantId ], (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else {
                console.log("result", res);
                result(null, res)
            }
        }  
    )
}

Resturant.addpicture = function(resturantId ,Key, result) {
    console.log("In resturant models",resturantId)
    console.log("In resturant models",Key)
    connection.query("UPDATE resturant SET profilepic = ? WHERE resturantId = ?", [Key, resturantId], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res)
            result(null, res)
        }
    })
}
Resturant.findrKey = function(resturantId, result){
    console.log("in key models", resturantId)
    connection.query("SELECT profilepic FROM resturant where resturantId = ?", resturantId, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res[0])
            result(null, res[0])
        }
    })
}

Resturant.findAll = function( result) {
    connection.query("SELECT * FROM resturant ", (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res);
        }
    })
}

Resturant.findLocation = function(city, result) {
    // console.log(city)
    connection.query("SELECT * FROM resturant WHERE city LIKE ?", `%${city}%`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            // console.log("result" , res);
            result(null, res);
        }
    })
}

Resturant.findResturant = function(resturantId, result) {
    console.log("in moels", resturantId) 
    connection.query("SELECT * FROM resturant WHERE resturantId = ?", resturantId, (err, res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res[0]);
            result(null, res[0]);
        }
    })
}

module.exports = Resturant;