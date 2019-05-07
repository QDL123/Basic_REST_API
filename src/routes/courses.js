const express = require('express');
const router = express.Router();
const courseModel = require('../models/courseModel');

/* 
*  GET - RETRIEVE COURSE INFORMATION
*  Recieves unique code for a course as a url parameter
*  Looks up the course matching the code and returns its information
*
*  Should be able to handle expected edge/error cases
*/
router.get('/:courseCode', function (req, res) {
  try {
    // TODO: Find courseCode in database
    //Get course code
    const courseCode = req.params.courseCode;

    // TODO: Get information for said course
    courseModel.findOne({'code': courseCode}, 'code title description capacity', function(err, course) {
      if (err) {
        console.log(err);
        return res.status(200).send({"Error" : "Some unknown error occurred"});
      }

      if(course == null) {
        console.log("Null course");
        return res.status(200).send({"Error" : `Could not find course with code ${courseCode}`});
      }
      
      return res.status(200).send({
        "code" : course.code,
        "title" : course.title,
        "description" : course.description,
        "capacity" : course.capacity
      });
    });

    // TODO: Send course information as a response
    //res.status(200).send({ "foo": "bar" }); // dummy course info
  } catch (e) {
    res.status(500).send('Some error');
  }
});

/* 
*  GET - LIST ENROLLED STUDENTS
*  Given a code for a course, returns a list of students currently enrolled
*  Students should be returned in alphabetical order (by last name, first name as a tie-breaker)
*  If the course does not have any students enrolled, send an empty array in the response
*/
router.get('/:courseCode/roster', function (req, res) {
  try {
    const courseCode = req.params.courseCode;
    courseModel.findOne({code : courseCode}, function(error, course) {
      if(error) {
        console.log(error);
        res.status(500).send({"Error" : `Could not find course with code ${courseCode}`});
      }
      res.status(200).send({"students" : course.students});
    });
  } catch (e) {
      console.log(e);
      res.status(500).send('Some error');
  }
});

module.exports = router;
