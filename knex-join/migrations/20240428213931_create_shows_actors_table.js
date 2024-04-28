/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('shows_actors', function(table) {
        table.integer('show_id').unsigned().notNullable();
        table.integer('actor_id').unsigned().notNullable();
        table.foreign('show_id').references('id').inTable('shows');
        table.foreign('actor_id').references('id').inTable('actors');
        table.primary(['show_id', 'actor_id']); // Composite primary key
      }); 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('shows_actors');  
};
