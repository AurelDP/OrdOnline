const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const homeRoutes = require("./routes/homeRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const userRoutes = require("./routes/userRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/home", homeRoutes)
app.use("/prescription", prescriptionRoutes)
app.use("/users", userRoutes)
app.use("/patient", patientRoutes)

app.listen(8081);