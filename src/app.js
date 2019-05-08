//Import needed modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const courseModel = require('./models/courseModel');

const MONGO_PW = '';//Insert password here

const deploymentURL = 'mongodb+srv://dbUser:' + 
    MONGO_PW +
    '@hdvi-cluster-xincs.mongodb.net/test?retryWrites=true';

const localURL = 'mongodb://127.0.0.1:27017/HDVI';

//Connect to the database
mongoose.connect(deploymentURL, {useNewUrlParser: true})
    .then(result => {
        console.log("Successfully connected to the database.");
    })
    .catch(error => {
        console.log(error);
        console.log("Error: Could not connect to the database.");
    });

//Retrieve the course information (Bonus)
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

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());


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

module.exports = app;