/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('contacts', function(table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('phone_number').notNullable();
        table.string('address');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('contacts');
};
