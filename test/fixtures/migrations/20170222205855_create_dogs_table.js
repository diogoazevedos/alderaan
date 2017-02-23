
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('dogs', (table) => {
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  }),
  knex.raw('ALTER TABLE dogs ADD updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('dogs'),
]);
