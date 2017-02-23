import test from 'ava';
import knex from 'knex';
import { is, unless } from 'ramda';
import { Maybe } from 'ramda-fantasy';
import config from './fixtures/database';
import Model from '../lib/model';
import Repository from '../lib/repository';

const db = knex(config);
const { isNothing, isJust } = Maybe;
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

test.serial('should store and resource in storage', (t) => {
  const model = new Model();

  return repository.create(db, model)
    .then(unless(is(Model), t.fail));
});
