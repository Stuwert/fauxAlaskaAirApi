
exports.up = function(knex, Promise) {
  return knex.schema.createTable('flights', function(table){
    table.increments();
    table.dateTime('flightDeparture')
    table.dateTime('flightArrivalTime')
    table.string('departureAirport')
    table.string('arrivalAirport')
    table.string('departureCity')
    table.string('arrivalCity')
    table.integer('miles')
    table.string('aircraft')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('flights');
};
