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
  this.salt = crypto.randomBytes( 16 ).toString('hex');
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

