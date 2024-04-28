/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: 'Laptop', description: 'High performance laptop', price: 999.99},
        {name: 'Smartphone', description: 'Latest model smartphone', price: 699.99},
        {name: 'Tablet', description: 'Portable and powerful tablet', price: 400.00}
      ]);
    });
};