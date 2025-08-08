import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('assignments', table => {
    table.bigIncrements('id').primary();
    table.bigInteger('module_id').unsigned().notNullable().references('id').inTable('modules').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.timestamp('due_date', { useTz: true });
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp('deleted_at', { useTz: true }).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('assignments');
}
