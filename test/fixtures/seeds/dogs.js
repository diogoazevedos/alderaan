exports.seed = (knex, Promise) => Promise.all([
  knex('dogs').insert([
    {},
  ]),
]);
