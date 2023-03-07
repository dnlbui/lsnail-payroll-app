// for dev
require("dotenv").config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET

};
