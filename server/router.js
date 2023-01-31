const Authentication  = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport        = require('passport');
const EmployeeControl    = require('./controllers/employeeControl')

const requireAuth   = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // returns token if user is Employee is able to authenticate
  
  //login
  app.post('/auth/signin', requireSignin, Authentication.signin);
  //sign up
  app.post('/auth/signup', Authentication.signup);
  //add employee to db
  app.post('/api/employeelist', requireAuth, EmployeeControl.createNewEmployee)
  //remove employee from db
  //app.delete('/api/employeelist/:employeeId', requireAuth, )
  //route that aggregates week of the day for a certain week....

  //route that gets employee list from all of the data

  //route that .post a new employee... similar to sign up?

  //route that gets ticket lists from a specific queries

  //route that .post a new ticket into an employee's document

  //route that .get by finding the employee by ID or name... then queries for date range... then aggregates the tickets total... Then manipulate the data to get what we need
  
};