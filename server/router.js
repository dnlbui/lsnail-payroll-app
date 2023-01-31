const Authentication     = require('./controllers/authentication');
const passportService    = require('./services/passport');
const passport           = require('passport');
const EmployeeControl    = require('./controllers/employeeControl')

const requireAuth   = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // returns token if user is Employee is able to authenticate
  
  //login (completed)
  app.post('/auth/signin', requireSignin, Authentication.signin);
  //sign up (completed) 
  app.post('/auth/signup', Authentication.signup);
  

  //add employee to db (completed)
  app.post('/api/employeelist', requireAuth, EmployeeControl.createNewEmployee)
  //Returns an array of objects with all ID+name inside employee model (completed)
  app.get('/api/employeelist', requireAuth, EmployeeControl.getEmployeeList)
  //remove employee from db (completed) (figure out how to set the url...)
  app.delete('/api/employeelist/:employee', requireAuth, EmployeeControl.removeEmployee)
  
  
  //route that .post a new ticket into an employee's document (completed)
  app.post('/api/ticket/:employee', requireAuth, EmployeeControl.createNewTicket)
  //route that gets ticket lists from a specific queries (completed)
  app.get('/api/ticket/', requireAuth, EmployeeControl.ticketQuery)
  //route that .get by finding the employee by ID or name... then queries for date range... then aggregates the tickets total... Then manipulate the data to get what we need
  app.get('/api/ticket/aggregation', requireAuth, EmployeeControl.aggregateTickets)
  
};