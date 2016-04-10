require('dotenv').load();
var environment = process.argv[process.argv.length - 1] === 'production' ? 'production' : 'development';
var config = require('../knexfile')[environment]
var db = require('knex')(config);


exports.seed = function(knex, Promise) {
  return db('users').then(function(users){
    return db('flights').then(function(flights){
      return Promise.join(
        // Deletes ALL existing entries
        knex('user_flights').del(),

        // Inserts seed entries
        knex('user_flights')
          .insert({
            user_id: users[0].id,
            flight_id: flights[0].id,
            milesEarned: 1200,
            seatRow: 0,
            seatLocation: '0',
            status: 'gold'
          }),
        knex('user_flights')
          .insert({
            user_id: users[1].id,
            flight_id: flights[0].id,
            milesEarned: 823,
            seatRow: 11,
            seatLocation: 'C',
            status: 'silver'
          })
      );
    })
  })
};
