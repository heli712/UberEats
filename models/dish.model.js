const connection = require('../config/dbconfig')

var Dish = function (dish) {
    this.dname = dish.dname;
    this.resturantId = dish.resturantId;
    this.price = dish.price;
    this.ingredients = dish.ingredients,
    this.veg = dish.veg,
    this.nonVeg = dish.nonVeg,
    this.vegan = dish.vegan, 
    this.rdes = dish.rdes,
    this.cuisineId = dish.cuisineId
}

Dish.create = function(newDish, result) {
    console.log("in model", newDish)
    connection.query("INSERT INTO dish SET ?", newDish, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("dish model", res);
            result(null, res);
        }
    })
}

Dish.getDish = function(dishId,result) {
    console.log("in model", dishId)
    connection.query("SELECT * FROM dish WHERE dishId = ?", dishId, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("dish model", res);
            result(null, res);
        }
    })
}

Dish.updateDetails = function(details, result) {
    console.log(details)
    connection.query("UPDATE dish SET dname = ?, ingredients = ?, cdes = ?, cusinieId = ?, veg = ?, nonVeg = ?, vegan = ?, Price = ? where resturantId = ? and dishId = ?",
    [details.dname, details.ingredients, details.cdes, details.cusinieId, details.veg, details.nonVeg, details.vegan, details.price, details.resturantId, details.dishId], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        console.log("result",res)
        result(null, res)
    }
    )
}

Dish.find = function(name, result) {
    console.log("in models", name)
    connection.query("SELECT r.rname, r.email, r.profilepic, r.mobileNo, r.start, r.close, r.cdes, r.pickup, r.delivery, r.cuisineId, r.veg, r.nonVeg, r.country, r.city, r.state FROM resturant r JOIN dish d ON r.resturantId = d.resturantId WHERE d.dname LIKE ? UNION SELECT r.rname, r.email, r.profilepic, r.mobileNo, r.close, r.start, r.cdes, r.pickup, r.delivery, r.cuisineId, r.veg, r.nonVeg, r.country, r.city, r.state FROM resturant r JOIN dish d ON r.resturantId = d.resturantId WHERE d.cuisineId = (SELECT cuisineId from cuisine where cuisineName LIKE ?) UNION SELECT r.rname, r.email, r.profilepic, r.mobileNo, r.start, r.close, r.cdes, r.pickup, r.delivery, r.cuisineId, r.veg, r.nonVeg, r.country, r.city, r.state FROM resturant r WHERE rname LIKE ? ;", 
    [['%' + name + '%'],['%' + name + '%'],['%' + name + '%']],
     (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        if(res.length){
            console.log("dishes are found", res)
            result(null, res)
        }
        else{
            console.log("no dishes", res);
            result( "no dishes", null) 
        }
    })
}
Dish.delDish = function(resturantId, dishId, result) {
    connection.query("DELETE FROM dish WHERE resturantId = ? and dishId = ?", [resturantId, dishId], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("deleted dishes", res);
            result(res, null); 
        }
    })
}
Dish.findResturant = function(resturantId, result) {
    connection.query("SELECT * FROM dish WHERE resturantId = ?", resturantId,
     (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
        }
        if(res.length) {
            console.log("dishes corresponding to resturant name", res)
            result(null, res)
        } else {
            console.log("no dishes found", res);
            result({kind: "no dishes"}, null)
        }
    })
}
module.exports = Dish;