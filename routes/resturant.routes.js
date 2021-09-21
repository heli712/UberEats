module.exports = app => {
    const resturant = require('../controller/resturant.controller.js')
    const { checkToken } = require('../middleware/auth.js')
    
    //CREATE a new resturant 
    app.post("/resturant/register", resturant.create);

    //login 
    app.post("/resturant/login", resturant.find);

    //update details
    app.post("/resturant/updateDetails", resturant.updateDetails);

    //get all the resturant
    app.post("/resturant/all", resturant.findAll)

    //get by location 
    app.post('/resturant/location',resturant.findLocation)

    //find key 
    app.post('/resturant/key',resturant.findrKey);
};