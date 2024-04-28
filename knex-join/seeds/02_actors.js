/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('actors').del()
  await knex('actors').insert([
    {id: 1, name: 'Bryan Cranston'},
    {id: 2, name: 'Aaron Paul'},
    {id: 3, name: 'Kit Harington'},
    {id: 4, name: 'Emilia Clarke'},
    {id: 5, name: 'Millie Bobby Brown'},
    {id: 6, name: 'David Harbour'}
  ]);
};
