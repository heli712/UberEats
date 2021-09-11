const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors') ;
const app = express();

// parse requests of content-type = application/json
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//parse requests of content-type = application/x-www-form-urlencoded

//checking
app.get("/check", (req, res) => {
    res.json({
        message: "Everything working on server.js"
    })
})

require("./routes/cusLogin.routes")(app);

app.listen(8080, () => {
    console.log("Server running on port 8080")
});