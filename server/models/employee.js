const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
var   crypto   = require('crypto');

// Define model for an employee
const EmployeeSchema = new Schema({
  "role"    : {type: String, lowercase: true},
  "name"    : {type: String, lowercase: true},
  "email"   : { type: String, unique: true, lowercase: true },
  "image"   : String,
  "hash"    : String,
  "salt"    : String,
  "tickets" : [{ type: Schema.Types.ObjectId, ref: "tickets" }]
});

EmployeeSchema.methods.setPassword = function ( password ) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes( 16 ).toString('hex');
  // Hashing user's salt and password with 1000 iterations, 64 length and sha512 digest
  // q: explain all of the this.hash stuff
  // a: this.hash is a property of the employee object
  //    crypto.pbkdf2Sync is a function that takes 5 arguments
  //    1. password
  //    2. salt
  //    3. iterations
  //    4. keylen
  //    5. digest
  //    the result of crypto.pbkdf2Sync is a buffer
  //    .toString('hex') converts the buffer to a string of hex values
  // crypto.pbkdf2Sync returns a buffer. A buffer is an array of integers. 
  // The integers are between 0 and 255.
  // The integers represent the ASCII values of the characters in the string.
  // The buffer is a hexadecimal representation of the string.
  this.hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64, 'sha512' ).toString( 'hex' );
};

EmployeeSchema.methods.validPassword = function( password ) {
  var hash = crypto.pbkdf2Sync( password, this.salt, 1000, 64, 'sha512' ).toString( 'hex' );

  return this.hash === hash;
}

const TicketSchema = new Schema(
  {
    "employee"      : [{ type: Schema.Types.ObjectId, ref: "employee" }],
    "serviceDate"   : Date,
    "serviceTotal"  : Number,
    "creditCardTip" : Number,
  },
  // will create fields of createdAt: and updatedAt
  { timestamps: true }
)

module.exports = {Employee: mongoose.model('employee', EmployeeSchema), Ticket: mongoose.model('ticket', TicketSchema)};

