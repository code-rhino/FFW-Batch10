/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('daily_temperatures').del()
  await knex('daily_temperatures').insert([
    { date: '2024-04-28', temperature: 20.0 },
    { date: '2024-04-29', temperature: 21.15 },
    { date: '2024-04-30', temperature: 22.31 },
    { date: '2024-05-01', temperature: 23.46 },
    { date: '2024-05-02', temperature: 24.62 },
    { date: '2024-05-03', temperature: 25.77 },
    { date: '2024-05-04', temperature: 26.92 },
    { date: '2024-05-05', temperature: 28.08 },
    { date: '2024-05-06', temperature: 29.23 },
    { date: '2024-05-07', temperature: 30.38 },
    { date: '2024-05-08', temperature: 31.54 },
    { date: '2024-05-09', temperature: 32.69 },
    { date: '2024-05-10', temperature: 33.85 },
    { date: '2024-05-11', temperature: 35.0 }
  ]);
};
