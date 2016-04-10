
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_flights', function(table){
    table.increments();
    table.integer('user_id')
    table.integer('flight_id')
    table.integer('seatRow')
    table.string('seatLocation')
    table.integer('milesEarned')
    table.string('status')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_flights')
};
