const { Customer } = require('../models/customer');




exports.sendInvoice = function (req, res) {

  // stript processing key ******************need to hide this in env file...
  const stripe = require('stripe')('sk_test_51MYtYyBxFn9jWOFEFIbu3aWCdeuTpNCnPC0cTaEbydlPxGkLoUX5FS11kmBtAmDCA5R8F2PbpYZsZb3Ca8sNp4dc003B6yNGb6');

  //need to grab email, price, and name from req.body...............
  let email = req.query.email;
  //temp... need to grab price from mongoDB ideally...
  let price = "price_1MYuGkBxFn9jWOFEBAwj0gyT";
  let name = req.query.name;
  let invoice;
  let invoiceItem;

  // Look up a customer in your database
  Customer.find ({email: email}, async (err, data) => {
    if(err) throw err;
    console.log(data);

    if(data.length !== 0) {
      console.log("customer found");

      // Create an Invoice
      invoice = await stripe.invoices.create({
        customer: data[0].stripeId,
        collection_method: 'send_invoice',
        days_until_due: 30,
      });

      // Create an Invoice Item with the Price, and Customer you want to charge
      invoiceItem = await stripe.invoiceItems.create({ 
        customer: data[0].stripeId,
        price: price,
        invoice: invoice.id
      });
      // Send the Invoice
      await stripe.invoices.sendInvoice(invoice.id);
      console.log(invoice)
      res.end();
    } 
    
    else if(data.length === 0) {
      console.log("customer not found");

      let customer = await stripe.customers.create({
        email,
        description: 'Customer to invoice',
      });
      let customerId = customer.id;
      const newCustomer = new Customer ({
        "name"    : name||'',
        "email"   : email,
        "stripeId": customerId,
      })
      
      newCustomer.save(async (err, data) => {
        // Create an Invoice
        invoice = await stripe.invoices.create({
          customer: customerId,
          collection_method: 'send_invoice',
          days_until_due: 30,
        });

        // Create an Invoice Item with the Price, and Customer you want to charge
        invoiceItem = await stripe.invoiceItems.create({ 
          customer: customerId,
          price: price,
          invoice: invoice.id
        });

        // Send the Invoice
        await stripe.invoices.sendInvoice(invoice.id);

        //************************************************ */
        res.end();
        //need to figure out error handling... not able to set header here
      });
      res.end();
    }
  });
};