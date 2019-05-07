const express = require('express');
const router = express.Router();
const studentModel = require('../models/studentModel');
const courseModel = require('../models/courseModel');

/* 
*  GET - STUDENT PROFILE
*  Look up a student and return his/her information
*  This function is left intentionally vague in terms of what :someId will be
*  You must choose what to use for this url parameter to be able to lookup a specific student
*
*  The endpoint currently responds with a hardcoded testStudent to illustrate what a real response could look like
*/

router.get('/:someId', function (req, res) {
  try {

    //Get the student id from the request
    const id = req.params.someId;
    console.log(`id: ${id}`);

    //Now fetch the data and send a response
    studentModel.findById(id)
      .exec()
      .then(student => {
        res.status(200).send(student);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send({ 'Error': `Could not find student: ${id}` });
      });

  } catch (e) {
    //Handle exceptions
    res.status(500).send('Some error');
  }
});

/* 
*  POST - REGISTER A NEW STUDENT
*  Recieves information about a new student and saves him/her in database
*/
router.post('/register', function (req, res) {
  try {
    //Get student's data from the request and instantiate the model
    let student = new studentModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      email: req.body.email
    });
    //Save the data to the database
    student.save()
      .then(result => {
        console.log(result);
        console.log('Success!')
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        console.log("Error: Could not save student to the database.");
        res.status(500).json("Error: Couldn't register student.");
      });
  } catch (e) {
    //Handle exceptions
    console.log(e);
    res.status(500).send('Some error');
  }
});

/* 
*  POST - ENROLL STUDENT
*  Enroll a student in a course

It seems like more info is needed here. The student's id and the course id are needed
intially the endpoint path is just /enroll.
Does the request body contain the student and course Ids?
*/
router.post('/enroll', function (req, res) {
  try {
    const studentId = req.body.studentId;
    const courseCode = req.body.courseCode;

    //Check the course capacity and whether or not the studuent is alread enrolled.
    //Start with checking if the student is already enrolled
    courseModel.findOne({'code': courseCode}, '_id capacity startDate students', function(err, course) {
      //Check for error in getting the course
      
      if (err) {
        console.log(err);
        return res.status(500).send({"Error" : "Some unknown error occurred"});
      }

      //Check if the course exists
      if(course == null) {
        console.log("Null course");
        return res.status(500).send({"Error" : `Could not find course with code ${courseCode}`});
      }

      //Check if student is already enrolled
      for(let i = 0; i < course.students.length; ++i) {
        console.log(`course.students: ${course.students[i]} studentId: ${studentId}`);
        if(course.students[i] == studentId) {
          console.log("The student is already enrolled");
          return res.status(500).send({"Error" : `Student with id ${studentId} is already enrolled.`})
        }
      }

      //Check the capacity
      if(course.capacity == 0) {
        console.log("Course is full");
        return res.status(500).send({"Error" : `Course with code ${courseCode} is full.`});
      }

      //Check if it's past the start date
      //Get the current date
      const startDate = course.startDate;
      
      if(startDate != null) {
        const currentDate = new Date().getDay();
        if(!(currentDate.getDate() == startDate.getDate() && currentDate.getMonth() == startDate.getMonth()) || currentDate > startDate) {
          //It's too late to enroll
          return res.status(500).send({"Error" : `It is past the start date for course with code ${courseCode}`});
        }
      }
    
      //Add the student to the course's students array
      course.students.push(studentId);
      
      //Update the course in the database
      courseModel.findOneAndUpdate(
        {"_id" : course._id},
        {"students" : course.students},
        {new: true},
        (error, course) => {
          if(error) {
            console.log(error);
            return res.status(500).send(error);
          }
          return res.status(200).send({"Success!": "Enrollment succeeded!"});
        })
        .catch(error => {
          console.log(error);
          res.status(500).send({"Error" : "Could not update course."});
        });
        
    });
    
  } catch (e) {
    console.log(e);
    res.status(500).send('Some error');
  }
});

/////////////////////////////////
//Bonus
router.delete('/:studentId/delete', function (req, res) {
  studentModel.findOneAndDelete(req.params.studentId, function (error) {
    if(error) {;
      return res.status(500).send({"Error" : "Could not delete student"})
    }

    return res.status(200).send({"Success" : "Deleted student"});
  });
});


module.exports = router;
