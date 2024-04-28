/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('shows_actors').del()
  await knex('shows_actors').insert([
    {show_id: 1, actor_id: 1},  // Bryan Cranston in Breaking Bad
    {show_id: 1, actor_id: 2},  // Aaron Paul in Breaking Bad
    {show_id: 2, actor_id: 3},  // Kit Harington in Game of Thrones
    {show_id: 2, actor_id: 4},  // Emilia Clarke in Game of Thrones
    {show_id: 3, actor_id: 5},  // Millie Bobby Brown in Stranger Things
    {show_id: 3, actor_id: 6}   // David Harbour in Stranger Things
  ]);
};
