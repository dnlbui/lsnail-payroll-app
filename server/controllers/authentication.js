const jwt        = require('jwt-simple');
const {Employee} = require('../models/employee');
const keys       = require('../config/dev');

function tokenForEmployee(employee) {
  console.log(employee)
  return jwt.encode(
    {
      sub: employee.id,
      // issued at
      iat: Math.round(Date.now() / 1000),
      // expiration at
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)
    }, 
    keys.TOKEN_SECRET
  )
};
//figure out WHY req.user and not req.employee
exports.signin = function(req, res, next) {
  // Employee has had their email and password auth'd
  // Just need to give them a token
  res.send({
    token: tokenForEmployee(req.user)
  });
};

exports.currentEmployee = function(req, res) {
  const employee = {
    email: req.user.email,
    token: tokenForEmployee(req.user),
  }

  res.send(user);
};

// MIGHT NEED TO ADD WAY TO SET UP ROLE 
//function which returns a response dependent on password and email input
exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email);

  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide an email or password'});
  }

  // See if a employee with the given email exists
  Employee.findOne({ email: email }, function(err, existingEmployee) {
    if ( err ) {return next ( err )}

    // If an employee's email does exist, return an error
    if( existingEmployee ) {
      return res.status( 422 ).send({error: 'Email not available'});
    }

    // If a employee with email does NOT exist, create and save employee record
    const employee = new Employee();

    employee.email = email;

    employee.setPassword(password);

    employee.save(function(err, employee) {
      if ( err ) { return next (err); }

      // Respond to request indicating the employee was created
      res.json({ token: tokenForEmployee(employee) });
    });
  });
};