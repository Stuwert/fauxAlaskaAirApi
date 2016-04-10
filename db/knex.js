var environment = process.env.NODE_ENV || 'development';
console.log(environment);
var config = require('../knexfile')[environment]
module.exports = require('knex')(config);
