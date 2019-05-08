const express = require('express');
const router = express.Router();
const courseModel = require('../models/courseModel');
const axios = require('axios')

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

//Compare function for putting students in order
function compare(a, b) {
  if(a.lastName < b.lastName) {
    return -1;
  } else if(b.lastName < a.lastName) {
    return 1;
  } else {
    if(a.firstName < b.firstName) {
      return -1;
    } else if(b.firstName < a.firstName) {
      return 1;
    } else {
      return 0;
    }
  }
}

router.get('/:courseCode/roster', function (req, res) {
  try {
    const courseCode = req.params.courseCode;
    courseModel.findOne({code : courseCode}, function(error, course) {
      if(error) {
        console.log(error);
        res.status(500).send({"Error" : `Could not find course with code ${courseCode}`});
      }

      let studentPromises = [];
      for(let i = 0; i < course.students.length; ++i) {
        let studentPromise = axios.get(`http://localhost:3000/api/student/${course.students[i]}`)
        studentPromises.push(studentPromise);
      }
      console.log("Past the loop");
      Promise.all(studentPromises).then(students => {
        console.log("Promises complete");
        let studentData = [];
        for(let i = 0; i < students.length; ++i) {
          studentData.push(students[i].data);
        }
        console.log(studentData)
        studentData.sort(compare);
        res.status(200).send(studentData);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });  
    });
  } catch (e) {
      console.log(e);
      res.status(500).send('Some error');
  }
});

//Delete course
router.delete('/:courseCode/delete', function(req, res) {
  const courseCode = req.params.courseCode;
  courseModel.findOneAndDelete({'code' : courseCode}, function (error) {
    if(error) {;
      return res.status(500).send({"Error" : `Could not delete course ${courseCode}`});
    }

    return res.status(200).send({"Success" : `Deleted course ${courseCode}`});
  });
});

//Update course
router.patch('/:courseCode/update', function(req, res) {
  const courseCode = req.params.courseCode;
  const updates = req.body;
  courseModel.findOneAndUpdate({"code" : courseCode}, updates, {new: true}, (error, course) => {
    if(error) {
      console.log(error)
      res.status(500).send(error);
    }

    res.status(200).send(course);
  });
});

module.exports = router;
