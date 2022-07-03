const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/home", homeRoutes)
app.use("/users", userRoutes)

app.listen(8081);