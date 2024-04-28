/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('shows').del()
  await knex('shows').insert([
    {id: 1, title: 'Breaking Bad'},
    {id: 2, title: 'Game of Thrones'},
    {id: 3, title: 'Stranger Things'}
  ]);
};
