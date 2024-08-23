const express = require('express');
const fs = require('fs');
const path = require('path');

const { middleWareWrapper } = require('../tools');

const router = express.Router();


/* GET users listing. */
router.get('/', middleWareWrapper( async function(req, res) {
  await setTimeout(function() {});
  res.send('respond with a resource');
}));

router.get('/omkaragrawal', middleWareWrapper(function(request, response) {
  response.render('omkaragrawal', { userName: 'Omkar Agrawal'});
}));

//https://www.google.com/search?q=abcd&rlz=1C5CHFA_enIN1018IN1018&oq=abcd&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQIxgnMgwIAhAjGCcYgAQYigUyEwgDEC4YgwEYxwEYsQMY0QMYgAQyDQgEEAAYgwEYsQMYgAQyDQgFEAAYgwEYsQMYgAQyDQgGEAAYgwEYsQMYgAQyEwgHEC4YgwEYxwEYsQMY0QMYgAQyEAgIEAAYgwEYsQMYgAQYigUyCggJEAAYsQMYgATSAQc2OTFqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8

/**
 * Data to be consumed: https://jsonplaceholder.typicode.com/users
 * Our URL: http://localhost:3333/users/all-users
 */
router.get('/all-users', middleWareWrapper(async function(request, response) {
  const data = await fetch('https://jsonplaceholder.typicode.com/users');

  let userData = await data.json();

  // response.send(userData);
  response.render('all-users', { data: userData });
}));

/**
 * http://localhost:3334/users/find/Karianne
 */
router.get('/find/:userName', middleWareWrapper(async function (req, res) {
  // const data = await fetch('https://jsonplaceholder.typicode.com/users');
  // let allUserData = await data.json();

  fs.readFile(path.join('Database', 'data', 'user-data.json'), 'utf8', (err, data) => {
    if (err) {
      res.send(err);
      return;
    }

    const allUserData = JSON.parse(data);
    const userData = allUserData.find((user) => user.username === req.params.userName);
    res.render('user', userData)
  });
}));

/** 
 * http://localhost:3334/users/search/?city=
 */
router.get('/search', middleWareWrapper(async function (req, res) {
  const data = await fetch('https://jsonplaceholder.typicode.com/users');
  let allUserData = await data.json();

  const userData = allUserData.filter((user) => user.address.city === req.query.city);

  res.send(userData);
}));

router.get('/refresh-data', middleWareWrapper(async (req, res) => {
  const data = await fetch('https://jsonplaceholder.typicode.com/users');
  let allUserData = await data.json();
  
  fs.writeFile(
    // 'Database/data/user-data.json', 
    path.join('Database', 'data', 'user-data.json'),
    JSON.stringify(allUserData), 
    'utf8', 
    (err, extraData) => {
      if (err) {
        res.send(err)
      } else {
        res.send('success');
      }
    });
}));

module.exports = router;
