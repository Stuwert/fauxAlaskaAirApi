
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('flights').del(),

    // Inserts seed entries
    knex('flights')
      .insert({
        flightDeparture:  new Date(2016, 3, 8, 3, 02, 0),
        flightArrivalTime: new Date(2016, 3, 8, 9, 22, 0),
        departureAirport: 'SEA',
        departureCity: 'Seattle',
        arrivalCity: 'Denver',
        arrivalAirport: 'DEN',
        miles: 823,
        aircraft: 'A320'
      })
  );
};
