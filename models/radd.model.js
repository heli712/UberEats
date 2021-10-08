const connection = require('../config/dbconfig')

var Raddress = function (raddress) {
    this.street = raddress.street,
    this.city = raddress.city, 
    this.country = raddress.country,
    this.state = raddress.state,
    this.resturantId = raddress.resturantId
}

Raddress.addR = function(raddr, result) {
    connection.query("INSERT INTO raddress SET ?", raddr, (err, res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log("result", res);
            result(null, res)
        }
    })
}

module.exports = Raddress;