exports.up = function(knex) {
  return knex.schema.createTable("users", t => {
    t.increments("id");
    t.string("email")
      .unique()
      .notNullable();
    t.string("password").nullable();
    t.string("firstName");
    t.string("lastName");
    t.enu("status", ["active", "inactive"]).defaultTo("active");
    t.enu("role", ["admin", "doctor", "accountant"]).notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
