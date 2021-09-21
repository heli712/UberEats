const connection = require('../config/dbconfig')

var Dish = function (dish) {
    this.dname = dish.dname;
    this.resturantId = dish.resturantId;
    this.price = dish.price;
    this.ingredients = dish.ingredients,
    this.veg = dish.veg,
    this.nonVeg = dish.nonVeg,
    this.vegan = dish.vegan
}

Dish.create = function(newDish, result) {
    console.log("in model", newDish)
    connection.query("INSERT INTO dish SET ?", newDish, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log("dish model", res.InsertId);
            result(null, res.InsertId);
        }
    })
}

Dish.updateDetails = function(details, result) {
    console.log(details)
    connection.query("UPDATE dish SET dname = ?, ingredients = ?, rdes = ?, cusinieId = ?, veg = ?, nonVeg = ?, vegan = ?, Price = ? where resturantId = ? and dishId = ?",
    [details.dname, details.ingredients, details.rdes, details.cusinieId,details.veg, details.nonVeg, details.vegan, details.price, details.resturantId, details.dishId], (err, res) => {
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
    connection.query("SELECT r.rname, r.email, r.mobileNo, r.timings, r.cdes, r.pickup, r.delivery, r.cuisineId, r.veg, r.nonVeg, r.country, r.city, r.state FROM resturant r JOIN dish d ON r.resturantId = d.resturantId WHERE d.dname LIKE ? UNION SELECT r.rname, r.email, r.mobileNo, r.timings, r.cdes, r.pickup, r.delivery, r.cuisineId, r.veg, r.nonVeg, r.country, r.city, r.state FROM resturant r JOIN dish d ON r.resturantId = d.resturantId WHERE d.cuisineId = (SELECT cuisineId from cuisine where cuisineName LIKE ?) UNION SELECT r.rname, r.email, r.mobileNo, r.timings, r.cdes, r.pickup, r.delivery, r.cuisineId, r.veg, r.nonVeg, r.country, r.city, r.state FROM resturant r WHERE rname LIKE ? ;", 
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
            result({kind: "no dishes"}, null) 
        }
    })
}
Dish.delDish = function(resturantId, dname, result) {
    connection.query("DELETE FROM dish WHERE resturantId = ? and dname = ?", [resturantId, dname], (err, res) => {
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
Dish.findResturant = function(rname, result) {
    connection.query("SELECT * FROM dish d JOIN resturant r on r.resturantId = d.resturantId and rname = ?", rname,
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