/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex("users")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("users").insert([
          { id: 1, name: "Alice" },
          { id: 2, name: "Robert" },
          { id: 3, name: "Eve" },
        ]);
      }),
    knex("recipes")
      .del()
      .then(function () {
        // Inserts seed entries
        return knex("recipes").insert([
          { id: 1, name: "Shrimp Pasta" },
          { id: 2, name: "Potato Racheros" },
          { id: 3, name: "Egg Salad" },
        ]);
      }),
  ]);
};
