const express = require("express");
const bodyParser = require('body-parser')
require("dotenv").config();
const headerAuthentication = require("./middlerware/headerAuthentication");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.set('view engine', 'html');
app.use(headerAuthentication.checkAPIKeys)

app.use('/api/v1', require('./module/v1/route_manager'))

// app.get("/", (req, res) => {
//     res.send("Node server running 🚀");
// });

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
