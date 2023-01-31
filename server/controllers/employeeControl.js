const {Employee, Ticket} = require('../models/employee');

// Creates a new employee profile
exports.createNewEmployee = function (req, res) {
  const newEmployee = new Employee ({
  "role"    : 'employee',
  "name"    : req.body.name,
  "email"   : req.body.email,
  "image"   : req.body.image,
  })

  newEmployee.save();
  res.end();
}

// Get employee list. Returns an array of objects with ID+name
exports.getEmployeeList =  async (req, res) => {
  Employee.find()
  //don't need to put _id bc it'll be added automatically
  .select(['name'])
  .exec((err,e) => {
    if(err) throw err;
    res.send(e);
  })
}

// Removes employee profile
exports.removeEmployee = function (req, res) {
  const employeeId = req.params.employee;
  Employee.findByIdAndDelete({_id: employeeId}, (err, data) => {
    if(err) throw err;
    res.send(data);
  });
};

// Add/Push ticket id into the employee ticket array while saving a new ticket
exports.createNewTicket = function (req, res) {
  const employeeId = req.params.employee;
  let foundEmployee = Employee.find({_id: employeeId}).exec((err,data) => {console.log(data)});

  let newTicket = new Ticket({
    "serviceDate"   : req.body.date,
    "serviceTotal"  : req.body.total,
    "creditCardTip" : req.body.tip,
  });

  Employee.findOne({_id: employeeId}, (err,data) => {
    console.log(data);
    newTicket.employee.push(data);
    newTicket.save();
  });

  Employee.updateOne({_id: employeeId}, {$push: {tickets: newTicket}}, (err, data) => {
    res.send(data);
  })
}

exports.ticketQuery = (req, res) => {
  
}
