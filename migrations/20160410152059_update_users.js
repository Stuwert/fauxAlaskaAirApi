
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('username')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.integer('username')
  })
};
