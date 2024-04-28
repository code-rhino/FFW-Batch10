/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('contacts').del()
  await knex('contacts').insert([
    {name: 'John Doe', phone_number: '555-1234', address: '123 Elm St'},
    {name: 'Jane Smith', phone_number: '555-5678', address: '456 Oak St'},
    {name: 'Jim Bean', phone_number: '555-8765', address: '789 Pine St'}
  ]);
};
