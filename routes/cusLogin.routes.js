module.exports = app => {
    const customer = require('../controller/customer.controller.js')
    
    //CREATE a new Customer 
    app.post("/login", customer.create);
};