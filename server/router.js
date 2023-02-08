const Authentication     = require('./controllers/authentication');
const passportService    = require('./services/passport');
const passport           = require('passport');
const EmployeeControl    = require('./controllers/employeeControl')
const InvoiceControl     = require('./controllers/invoiceControl')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY  || require('./config/keys').STRIPE_SECRET_KEY);         
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || require('./config/keys').STRIPE_WEBHOOK_SECRET;

const requireAuth   = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  
  
  //login (completed)
  // returns token if user is Employee is able to authenticate
  app.post('/auth/signin', requireSignin, Authentication.signin);
  //sign up (completed) 
  app.post('/auth/signup', Authentication.signup);
  

  //add employee to db (completed)
  app.post('/api/employeelist', requireAuth, EmployeeControl.createNewEmployee)
  //Returns an array of objects with all ID+name inside employee model (completed).... COULD USE AGGREGATION AND RETURN AN ARRAY OF NAMES ONLY USING DISTINCT 
  app.get('/api/employeelist', requireAuth, EmployeeControl.getEmployeeList)
  //remove employee from db (completed) (figure out how to set the url...)
  app.delete('/api/employeelist/:employee', requireAuth, EmployeeControl.removeEmployee)
  
  
  //route that .post a new ticket into an employee's document (completed)
  app.post('/api/ticket/:employee', requireAuth, EmployeeControl.createNewTicket)
  //route that gets ticket lists from a specific queries (completed)
  app.get('/api/ticket/', requireAuth, EmployeeControl.ticketQuery)

  app.delete('/api/ticket/:ticket', requireAuth, EmployeeControl.removeTicket)

  //route that .get by finding the employee by ID or name... then queries for date range... then aggregates the tickets total... Then manipulate the data to get what we need
  app.get('/api/ticket/aggregation', requireAuth, EmployeeControl.aggregateTickets)
  

  //route that creates a product 
  app.post('/api/sendinvoice', requireAuth, InvoiceControl.sendInvoice)
  //creates a price for the product
  
  //creates a customer while saving them in mongoDB

  // //create webhook for stripe
  // app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  //   let event = request.body;
  //   // Only verify the event if you have an endpoint secret defined.
  //   // Otherwise use the basic event deserialized with JSON.parse
  //   if (endpointSecret) {
  //     // Get the signature sent by Stripe
  //     const signature = request.headers['stripe-signature'];
  //     try {
  //       event = stripe.webhooks.constructEvent(
  //         request.body,
  //         signature,
  //         endpointSecret
  //       );
  //     } catch (err) {
  //       console.log(`⚠️  Webhook signature verification failed.`, err.message);
  //       return response.sendStatus(400);
  //     }
  //   }
  
  //   // Handle the event
  //   switch (event.type) {
  //   case 'invoice.payment_failed':
  //     const invoice = event.data.object;
  //     // Then define and call a method to handle the failed payment of an Invoice.
  //     // handleFailedInvoice(invoice);
  //     break;
  //     default:
  //       // Unexpected event type
  //       console.log(`Unhandled event type ${event.type}.`);
  //   }
  
  //   // Return a 200 response to acknowledge receipt of the event
  //   response.send();
  // });
  
};