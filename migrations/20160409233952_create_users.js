
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.integer('lifetimeMiles');
    table.integer('currentMiles');
    table.integer('username');
    table.string('password');
    table.string('eail');
    table.boolean('authorization');
    table.string('status')
    table.integer('milesMultiplier')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
