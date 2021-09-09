const express = require('express');
const bodyParser = require('body-parser');
//const connection = require('../config/dbconfig')
const app = express();

// parse requests of content-type = application/json
app.use(bodyParser.json());

//parse requests of content-type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

//checking
app.get("/check", (req, res) => {
    res.json({
        message: "Everything working on server.js"
    })
})

require("./routes/cusLogin.routes")(app);

app.listen(3000, () => {
    console.log("Server running on port 8080")
});