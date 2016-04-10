require('dotenv').load();
var bcrypt = require('bcrypt')
var salt = bcrypt.genSaltSync(10);


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users')
      .insert({
        lifetimeMiles: 5000,
        currentMiles: 200,
        username: 0015,
        password: bcrypt.hashSync(process.env.ADMIN_PW, salt),
        email: 'admin@urback.net',
        authorization: true,
        status: 'gold',
        milesMultiplier: 2
      }),
    knex('users')
      .insert({
        lifetimeMiles: 100,
        currentMiles: 0,
        username: 1161,
        password: bcrypt.hashSync(process.env.USER_PW, salt),
        email: 'admin@urback.net',
        authorization: false,
        status: 'silver',
        milesMultiplier: 1
      })
  );
};
