const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const surveyRoutes = require('./routes/user')
const { json, urlencoded } = require('express')
const PORT = process.env.PORT || 5000

dotenv.config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`server running at port: ${PORT}`)
        })
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// // Add headers before the routes are defined
app.use(function (req, res, next) {
    console.log(req)
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//APP BASE ROUTE
app.use("/user", surveyRoutes)

//APP ERROR ROUTE
app.use((req, res, next) => {
    const error = new Error("Page Not found")
    error.status = 404;
    // redirect("/")
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        "error message": error.message,
        status: 401
    })
})
