const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const homeRoutes = require("./routes/homeRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/home", homeRoutes)

app.listen(8081);