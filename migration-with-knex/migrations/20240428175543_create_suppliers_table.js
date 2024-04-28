/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('suppliers', (table) => {
        table.increments('id'); // Primary key
        table.string('name').notNullable();
        table.string('contact_name');
        table.timestamps(true, true); // Adds created_at and updated_at columns
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('suppliers');
};
