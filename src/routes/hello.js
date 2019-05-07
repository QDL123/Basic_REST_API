const express = require('express');
const router = express.Router();

/* 
  GET - HELLO WORLD
  Hello World endpoint to test that your initial setup worked
  Feel free to remove this if desired since it is not part of the challenge requirements
*/
router.get('/', function (req, res) {
    res.status(200).send('Hello World!');
});

module.exports = router;
