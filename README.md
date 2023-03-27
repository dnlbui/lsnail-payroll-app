Nail Salon Payroll, Invoicing, and Booking System

This project is a payroll, invoicing and booking system that allows the owner to manage employees. It is implemented using React, Redux, Node.js, Express, MongoDB, and Stripe's invoicing API. The app is deployed on Heroku and can be accessed through https://sleepy-bastion-96890.herokuapp.com/.

Table of Contents

    Features
    Installation
    Usage
    Contributing
    License

Features

    Login and registration of users
    Management of employees, including creation, editing, and deletion of employee records
    Creation and sending of invoices to customers, with the ability to view the status of the invoice
    Booking of appointments for customers, with the ability to view upcoming appointments and cancel them if necessary

Installation

    1. Clone the repository to your local machine:

      git clone https://github.com/dnlbui/lsnail-payroll-app.git

    2. Install the dependencies for the server:

      cd lsnail-payroll-app/server
      npm install
      
    3. Install the dependencies for the client:
cd ../client
npm install

Create a .env file in the server folder and add the following environment variables:

sh

DATABASE_URL=<your MongoDB database URL>
SESSION_SECRET=<your session secret>
STRIPE_SECRET_KEY=<your Stripe secret key>

Start the server and client in separate terminals:

sh

    # In one terminal:
    cd lsnail-payroll-app/server
    npm start

    # In another terminal:
    cd lsnail-payroll-app/client
    npm start

    The app should now be running at http://localhost:3000/.

Usage

To use the app, you can register a new account or log in with the credentials of an existing user. Once you are logged in, you can use the navbar to navigate to different pages of the app:

    Dashboard: This page displays a summary of the user's information, such as the number of employees and customers, as well as any upcoming appointments and unpaid invoices.
    Employees: This page allows the user to manage their employees, including creating, editing, and deleting employee records. The user can also view the details of an employee, such as their work schedule and past payments.
    Invoices: This page allows the user to create and send invoices to customers, as well as view the status of each invoice. The user can also mark an invoice as paid or cancel it if necessary.
    Appointments: This page allows the user to view upcoming appointments and cancel them if necessary. The user can also create a new appointment by selecting a customer and a date/time slot.

Contributing

Contributions to this project are welcome. To contribute, please follow these steps:

    Fork the repository and create a new branch.
    Make your changes and commit them with a descriptive message.
    Push your changes to your forked repository.
    Create a pull request to merge your changes into the main repository.

License

This project is licensed under the MIT License. See the LICENSE file for details.
