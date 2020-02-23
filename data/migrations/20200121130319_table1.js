exports.up = function(knex) {
  return knex.schema.createTable("table", t => {
    t.increments("id");
    t.string("text");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("table");
};
