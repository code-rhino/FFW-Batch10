/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('suppliers').del()
  await knex('suppliers').insert([
    {name: 'Supplier One', contact_name: 'John Doe'},
    {name: 'Supplier Two', contact_name: 'Jane Doe'},
    {name: 'Supplier Three', contact_name: 'Jim Beam'}
  ]);
};
