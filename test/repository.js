import test from 'ava';
import knex from 'knex';
import { utc } from 'moment';
import { is, unless } from 'ramda';
import { isNothing, isJust, maybeToNullable } from 'sanctuary';
import config from './fixtures/database';
import Model from '../lib/model';
import Repository from '../lib/repository';

const db = knex(config);
const repository = new Repository('dogs', Model);

test.beforeEach(() => (
  db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run())
));

test.serial('should fetch all resources', t => (
  repository.all(db)
    .then(unless(is(Array), t.fail))
));

test.serial('should find a resource and return a just instance', t => (
  repository.find(db, 1)
    .then(unless(isJust, t.fail))
));

test.serial('should not find a resource and return a nothing instance', t => (
  repository.find(db, 2)
    .then(unless(isNothing, t.fail))
));

test.serial('should store and return a resource in storage', (t) => {
  const model = new Model();

  return repository.create(db, model)
    .then(unless(is(Model), t.fail));
});

test.serial('should update a specific resource in storage', async (t) => {
  const maybe = await repository.find(db, 1);
  const model = maybeToNullable(maybe);

  model.createdAt = utc('2015-10-05T20:15:10Z');

  const updated = await repository.update(db, model);

  t.true(updated.createdAt.isSame(model.createdAt));
});

test.serial('should delete a specific resource in storage', t => (
  repository.destroy(db, 1)
    .then(unless(is(Number), t.fail))
));
