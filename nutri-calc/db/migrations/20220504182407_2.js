/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return Promise.all([
    //   knex.schema.createTable("users", function (table) {
    //     table.increments("id");
    //     table.string("name", 255).notNullable();
    //     table.integer("recipe_id");
    //   }),
    knex.schema.createTable("recipes", function (table) {
      table.increments("id");
      table.string("title");
      table.string("subtitle");
      table.text("notes");
      table.json("steps");
      table.json("ingredients");
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTable("recipes"),
    // knex.schema.dropTable("users"),
  ]);
};
