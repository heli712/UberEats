module.exports = app => {
    const resturant = require('../controller/resturant.controller.js')
    const { checkToken } = require('../middleware/auth.js')
    
    //CREATE a new resturant 
    app.post("/resturant/register", resturant.create);

    //login 
    app.post("/resturant/login", resturant.find);

    app.post('/resturant/findall',resturant.findAll);

    app.post('/resturant/findResturant',resturant.findResturant);


    //update details
    app.post("/resturant/updateDetails", resturant.updateDetails);


    //get by location 
    app.post('/resturant/location',resturant.findLocation)

    //find key 
    app.post('/resturant/key',resturant.findrKey);
};