const {Employee, Ticket} = require('../models/employee');
const ObjectId = require('mongoose').Types.ObjectId

// Creates a new employee profile
exports.createNewEmployee = function (req, res) {
  const newEmployee = new Employee ({
  "role"    : req.body.role == 'Abgail14'? 'manager' : 'employee',
  "name"    : req.body.name,
  "email"   : req.body.email,
  "image"   : req.body.image ||'https://via.placeholder.com/250?text=Employee+Image',
  })

  newEmployee.save((err, data) => {
    //************************************************ */
    res.end();
    //need to figure out error handling... not able to set header here
    });
  res.end();
}

// Get employee list. Returns an array of objects with ID+name
exports.getEmployeeList =  async (req, res) => {
  // cheeck for role and only send back employees if role is manager
  console.log(req.user)
  if(req.user.role === 'manager') {
    Employee.find()
    //don't need to put _id bc it'll be added automatically
    .select(['name','image'])
    .exec((err,e) => {
      if(err) throw err;
      res.send(e);
    })
  } 
  // if role is employee, send back the employee's name and image
  else if(req.user.role === 'employee') {
    Employee.find({_id: req.user._id})
    .select(['name','image'])
    .exec((err,e) => {
      if(err) throw err;
      res.send(e);
    })
  } else {
    res.status(401).send('You are not authorized for this action.')
  }
}

// Removes employee profile
exports.removeEmployee = function (req, res) {
  if(req.user.role === 'manager') {
    const employeeId = req.params.employee;
    Employee.findByIdAndDelete({_id: employeeId}, (err, data) => {
      if(err) throw err;
      res.send(data);
    });
  } else {
    res.status(401).send('You are not authorized for this action.')
  }
};

// Add/Push ticket id into the employee ticket array while saving a new ticket
exports.createNewTicket = function (req, res) {
  const employeeId = req.params.employee;
  let foundEmployee = Employee.find({_id: employeeId}).exec();

  let newTicket = new Ticket({
    "serviceDate"   : req.body.date,
    "serviceTotal"  : req.body.total,
    "creditCardTip" : req.body.tip,
  });

  Employee.findOne({_id: employeeId}, (err,data) => {
    newTicket.employee.push(data);
    newTicket.save();
  });

  Employee.updateOne({_id: employeeId}, {$push: {tickets: newTicket}}, (err, data) => {
    res.send(data);
  })
}

exports.ticketQuery = async (req, res) => {
  const dateStart = req.query.dateStart || null;
  const dateEnd = req.query.dateEnd || null;
  //employee ID...************************************
  const employeeId = req.query.employeeId || null;
  //when on front end just make the query desc or asc
  const priceSortFrom = req.query.sortOrder  === "highest" ? "desc"
                        :req.query.sortOrder === "lowest"  ? "asc"
                        :req.query.sortOrder !== undefined ? req.query.price.toLowerCase() //lowecases all price inputs
                        :null; 

  await Ticket
  .find(
    !employeeId && !dateStart               ? {}
    :!dateStart || !dateEnd                 ? {employee:  ObjectId(employeeId)}
    :!employeeId                            ? {"serviceDate":{ "$gte": dateStart, "$lt" : dateEnd}}
    :{serviceDate:{ "$gte": dateStart, "$lt" : dateEnd}, employee:  ObjectId(employeeId)}
    
  )
  .sort({ price: priceSortFrom })
  .exec((err, tickets) => {
    if(err) throw err;
    res.send(tickets)
  })
}

// Removes ticket from employee profile
exports.removeTicket = function (req, res) {
  const ticketId = req.params.ticket;
  Ticket.findByIdAndDelete({_id: ticketId}, (err, data) => {
    if(err) throw err;
    res.send(data);
  });
};

// 
exports.aggregateTickets = async (req, res) => {
  const employeeId = await req.query.employeeId || null;
  const dateStart = await req.query.dateStart || null;
  const dateEnd = await req.query.dateEnd || null;
  const priceSortFrom = req.query.sortOrder  === "highest" ? "desc"
  :req.query.sortOrder === "lowest"  ? "asc"
  :req.query.sortOrder !== undefined ? req.query.price.toLowerCase() //lowecases all price inputs
  :null; 

  //had to use new date b/c when using mongodb match the date strings do not automatically change to numbers...
  Ticket.aggregate([{$match: { employee:  ObjectId(employeeId), "serviceDate": { "$gt": new Date(dateStart), "$lt" : new Date(dateEnd) } }}])
  .group({ _id: employeeId, serviceTotal: {$sum: '$serviceTotal'}, tipTotal: {$sum: '$creditCardTip'}})
  .exec((err, tickets) => {
    if(err) {
      res.status(400).send('No files found')
    }
    if(tickets.length !== 0){
      tickets[0].grossTotal = tickets[0].serviceTotal + tickets[0].tipTotal;
      const employeeNet = tickets[0].grossTotal * 0.6;
      tickets[0].EmployeePayCheck = (employeeNet/2 + tickets[0].tipTotal).toFixed(2);
      tickets[0].EmployeePayCash  = (employeeNet/2 - tickets[0].tipTotal).toFixed(2);
      tickets[0].netShopTotal = (tickets[0].grossTotal - employeeNet).toFixed(2);
    }

    res.send(tickets)
  })
}

//aggregate.match({ employee: { $in: [ employeeId] } });
//{ employee:  ObjectId(employeeId), $and: {serviceDate:{ "$gt": dateStart, "$lt" : dateEnd}}}