const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const homeRoutes = require("./routes/homeRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/home", homeRoutes)
app.use("/prescription", prescriptionRoutes)

app.listen(8081);