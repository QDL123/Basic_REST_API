# HDVI-Intern-Challenge
## Challenge Overview
For this challenge, you are tasked with building a RESTful API for a sample company that meets their requirements. This challenge will assess your ability to research, understand, and implement using important tools/concepts that are used at HDVI such as RESTful/HTTP APIs, Databases, and Javascript (Node.js) fundamentals. We have provided some helpful links on some core concepts in the `Resources` section at the bottom of this document.

For guidance, you have been provided a 'skeleton' project (found in `src/`) to facilitate your development. Instructions on how to set up your local development environment and run the provided project can be found in the `Setup` section below. This project is essentially a bare-bones API with some basic structure and helpful comments that you will have to add functionality to in order to complete the requirements. While using the provided project as a starting point is highly recommended, you are free to refactor or otherwise alter any components as you see fit in building your final solution. 

The estimated time to complete the non-bonus portions of the challenge is roughly 4 hours. However, this is only a general estimate and your actual time may vary based on your familiarity with certain concepts, tools, and the Javascript/Node.js programming language. If you have any questions or concerns that are not covered clearly in this document, please email `chris@hdvinsurance.com` with the phrase 'HDVI Intern Challenge' somewhere in the email subject. 

## Initial Setup
### Instructions
This section assumes that your are working with a *nix environment (Unix, Linux, etc.). Note that exact commands and instructions may vary slightly depending on your specific operating system. If you are stuck on any of these steps, please reach out to `chris@hdvinsurance.com` for assistance. 

Prior to starting this challenge, you should install Node.js as it is the required language. It is recommended that you use the latest version of Node (11.14.x) as it is the version that is used at HDVI. However, the current LTS version (10.15.3) is also valid. Node can be installed via the website: [Node.js Site](https://nodejs.org/en/) or through alternate means.

After you have succesfully installed Node.js, follow these steps to get the project running initially:

- Download this repo and use it to instantiate your own PRIVATE Github repository. It is important that you do NOT commit to this repository, since it is shared with all candidates. Create your own repository based off of this one.
- In terminal, navigate into the `src/` directory and run `npm install` to install the provided packages for the skeleton project
- After the packages have installed, run `npm start` to run your application. You should see a message along the lines of "Express app started on port 3000" if successful.
- Once your project is running, you can open a web browser and navigate to `localhost:3000/api/hello` to see a 'Hello World' message.

To set up the database (MongoDB) portion of the challenge, you should create a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account. This will allow you to create/host your Mongo Database in the cloud and eventually connect your application to it. [Here](https://developerhandbook.com/mongodb/connect-mongo-atlas-mongoose/) is a link to a tutorial to set up your first MongoDB Atlas database with some sample code that interfaces with the database after it is set up. 

NOTE: You should be able to do everything required within Free Tier in MongoDB Atlas

### Recommended Tools/Libraries
The client requests that you build the API using Node.js as the language and the Express framework. They also ask that you use Mongodb as the database solution. Provided below for your convenience are some libraries and tools that will be useful in completing this assignment. The libraries are also listed in the provided `package.json` file and should be sufficient to complete the challenge, but feel free to add any additional ones if desired.

- [Express](https://expressjs.com/) - Popular web application framework for Node.js
- [Mongoose](https://mongoosejs.com/) - Node.js data modeling library commonly used when working with MongoDB
- [Postman](https://www.getpostman.com/) - Useful tool for developing and testing APIs. Can be used to make detailed HTTP requests to your endpoints

## The Problem
As a software engineer, you have been tasked with building a solution for your client, a company that offers instructional courses on a variety of subjects to students in the Chicago area. The client has asked you to build an API that they can use to perform a variety of functions, such as store a curriculum of courses, register new students, and enroll said students in classes of their choosing. Provided in this document are some specifications of endpoints they would like you to include in the API as well as general guidelines detailing their intended use cases and other considerations. 

## Key Terms/Actions
`Course` is representative of a specific instructional course/class that the company offers. Courses will have attributes associated with them such as title, description, capacity, and a code that will be unique for each course. A file titled `curriculum.json` contains a list of courses that will be used by your API.

`Student` is representative of an individual who can enroll in one or more courses. The API should handle storing information pertinent to each student such as first/last name, age, and email address.

`Register Student` is the action of signing up a new student. Each student can only be ‘registered’ once. A newly created student by default will not be enrolled in any classes. Your API should be able to handle not registering the same student more than once. For this challenge, you can enforce unique email addresses for the students as a means of checking if a student has already been registered.

`Enroll Student` is the process of adding an existing student to an existing course. When enrolling a student, you must check if the class is at capacity (`Capacity` of a course denotes the maximum amount of students that can be enrolled) and also if the student is already enrolled in said course. If these checks are passed, the student should be enrolled in the course.

## Requirements
### API Endpoints
Listed below are API endpoints requested by the client. The skeleton project includes 'empty' versions of each of these endpoints as well as comments to help guide you in adding the required functionality. Feel free to modify the provided endpoints or add any additional ones if desired.

`/api/course/:courseCode - GET`
This endpoint is intended for the company to view information about an existing course in the curriculum. It should accept a GET request that has an identifying parameter (course code) in the URL and returns information about the associated course in JSON format.

`/api/course/:courseCode/roster - GET`
This endpoint is intended for the company to view all enrolled students for a given course. It should accept a GET request that has an identifying parameter (course code) in the URL and return a list of all students currently enrolled in the course. The students should be ordered in alphabetical order by last name with first name used as a tie-breaker.

`/api/student/:studentId - GET`
This endpoint is intended for the company to view information about an enrolled student. It should accept a GET request that has an identifying parameter (denoted as studentId) in the URL and return information about the associated student in JSON format.

`/api/student/register - POST`
This endpoint allows the company to register a new student. It should accept a POST request that has information about the new student in the body of the request and handle storing the created student in the database.

The request body should always have the keys corresponding to attributes first name, last name, age, and email address.

`/api/student/enroll - POST`
This endpoint allows the company to enroll an existing student into an existing course. It should accept a POST request that contains identifying information about the student as well as the unique code for the course they are trying to enroll in the body of the request. It is up to you to design and document this endpoint as you see fit. Be sure to handle the different types of errors that can pop up during this function.

### Loading the Curriculum
The company has provided you with their initial curriculum in the form of a JSON file `curriculum.json`. This file contains a list of all the courses (and their information) that are being offered. When your application initially starts, it should read the file in and store the courses in the database. 

## Submission
To turn in your solution, please ensure you have pushed your final commit to your own private repository (remember, do NOT work directly off of this repository…it is shared between all candidates and you will simply be showing everyone else your solution). After doing so, please send a short email to `chris@hdvinsurance.com` to let me know that you are done. Your repository should include a brief text file that clearly details how to run your code locally as well as any optional documentation you choose to include. Upon receiving the submission, the team at HDVI will review your solution and determine if we would like to proceed with the next step of the interview process, which will be an interactive code review of your solution.

## Help
### General Tips/Advice
- Ensure your endpoints and underlying logic can handle common edge cases and/or errors. Some basic examples include trying to GET information on a course or student that does not exist or attempting to create a course or student that already exists.
- The included skeleton file is far from complete but has some useful hints and patterns that can greatly facilitate your implementation. Try to extend functionality or add on to existing skeleton functions first before considering ‘starting from scratch’ on your own.
- The client has requested that you use MongoDB, a widely-used non-relational database, in implementing your solution. While expertise with non-relational databases is absolutely not a requirement for successful completion of this challenge, you should try to understand general aspects of non-relational databases (and how they differ from SQL databases, for example) and approach modeling your solution appropriately. There is a helpful link included for MongoDB in the `Resources` section below.
- On a related note, there isn't any included Mongoose/MongoDB functionality in the starter project. This is intentional since we want to see your work and thought process from the very start to finish with researching, initializing, and eventually utilizing MongoDB as your database solution. There are a lot of accessible guides and articles on working with Mongoose in the context of a Node.js app, and you are encouraged to be as resourceful as you can.
- If uncertain about how to approach designing or implementing a particular feature, feel free to document any considerations or even alternative approaches alongside your solution.

### Resources
Here are some resources/guides that may be helpful in working with some of the libraries or general concepts in this challenge.

#### Javascript/Node.js
If you are relatively new to Javascript, one of the unique nuances you may notice is how asynchronous code is often leveraged. Specifically, many actions in JavaScript are asynchronous and code that is below another line of code will not necessarily wait until the above line has finished executing to run. To complete this challenge, it would help to have a basic understanding of callback functions, Promises, and the `async`/`await` keywords as well as [blocking/non-blocking code](https://nodejs.org/de/docs/guides/blocking-vs-non-blocking/) in general.

#### REST HTTP API
https://mlsdev.com/blog/81-a-beginner-s-tutorial-for-understanding-restful-api

#### Database (MongoDB)
There are many ways to model the information you are being asked to store about courses and students in your database. A good reference point is the MongoDB [documentation](https://docs.mongodb.com/manual/tutorial/#data-modeling-patterns) on Data Modeling Patterns.

## Bonus (COMING SOON)
Over the next few days, we will add bonus tasks to the challenge repo. These items are an added opportunity to impress us with your knowledge and demonstrate your ability. That said, the bonus items are entirely optional and should only be attempted once you are confident in your core solution. Having a functional and well-designed API that addresses all the core requirements is more important than completing bonus tasks.

TODO