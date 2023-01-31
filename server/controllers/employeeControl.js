const {Employee, Ticket} = require('../models/employee');

// Creates a new employee profile
exports.createNewEmployee = function (req, res) {
  const newEmployee = new Employee ({
  "role"    : 'employee',
  "email"   : req.body.email,
  "image"   : req.body.image,
  })

  newEmployee.save();
  res.end();
}

//
//