//Includes Express
const express = require('express');
//Honestly not sure what any of these things are
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const courseModel = require('./models/courseModel');


//console.log(`Environment password variable : ${process.env.MONGO_ATLAS_PW}`);
const MONGO_PW = 'AYEauIn6VYYUlh2Y';

const deploymentURL = 'mongodb+srv://dbUser:' + 
    MONGO_PW +
    '@hdvi-cluster-xincs.mongodb.net/test?retryWrites=true';

const localURL = 'mongodb://127.0.0.1:27017/HDVI';

///////////////////////////////////////////////////////
mongoose.connect(deploymentURL, {useNewUrlParser: true})
    .then(result => {
        //console.log(result);
        console.log("Successfully connected to the database.");
    })
    .catch(error => {
        console.log(error);
        console.log("Error: Could not connect to the database.");
    });

axios.get('https://hdvi-intern-api-prod.herokuapp.com/api/curriculum')
    .then(response => {
        const data = response.data;

        for (let i = 0; i < data.length; ++i) {
            let course = new courseModel({
                code: data[i].code,
                title: data[i].title,
                description: data[i].description,
                capacity: data[i].capacity,
                startDate: data[i].startDate,
                students: []
            });

            //Should save to collection of course models
            course.save()
                .then(result => {
                    console.log("Should store course in database!");
                })
                .catch(error => {
                    console.log(error);
                    console.log("Error: Could not save the course to the database.");
                });
        }
    })
    .catch(error => {
        console.log(error);
        console.log('Unable to load courses');
    });

    

//////////////////////////////////////////////////////



//Creates an instance of an express application
const app = express();

//No idea what these lines are doing, specifying some kind of settings in the express instance?
//Probably don't need to mess with this
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

//Attempt to fix undefined body problem
//app.use(bodyParser.urlencoded({ extended: true }));


// Set up the API endpoints
const courseRouter = require('./routes/courses');
const studentRouter = require('./routes/students');
const helloRouter = require('./routes/hello');

//Assigning urls to their respective endpoints.
app.use('/api/course', courseRouter);
app.use('/api/student', studentRouter);
app.use('/api/hello', helloRouter);

//Define a port and instruct the express instance to listen to requests on that port.
const port = 3000;
app.listen(port);
console.log('Express app started on port ' + port);

//Not really sure, but this just tells whatever module is what to export
//Where is module defined?

//Get the contents

module.exports = app;