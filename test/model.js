/* eslint-disable no-new */

import test from 'ava';
import { utc } from 'moment';
import Model from '../lib/model';

test('should instantiate a model with a valid id', (t) => {
  const model = new Model({ id: 1 });

  t.is(model.id, 1);
  t.deepEqual(model.attributes, { id: 1 });
});

test('should instantiate a model with a database id', (t) => {
  const model = Model.of({ id: 1 });

  t.is(model.id, 1);
  t.deepEqual(model.attributes, { id: 1 });
});

test('should create a model with a valid created_at', (t) => {
  const model = new Model({ createdAt: utc('2015-10-05 05:10:15') });

  t.true(utc('2015-10-05 05:10:15').isSame(model.createdAt));
  t.deepEqual(model.attributes, { created_at: '2015-10-05 05:10:15' });
});

test('should create a model with a database created_at', (t) => {
  const model = Model.of({ created_at: '2015-10-05 05:10:15' });

  t.true(utc('2015-10-05 05:10:15').isSame(model.createdAt));
  t.deepEqual(model.attributes, { created_at: '2015-10-05 05:10:15' });
});

test('should create a model with a valid updated_at', (t) => {
  const model = new Model({ updatedAt: utc('2015-10-05 20:15:10') });

  t.true(utc('2015-10-05 20:15:10').isSame(model.updatedAt));
  t.deepEqual(model.attributes, { updated_at: '2015-10-05 20:15:10' });
});

test('should create a model with a database updated_at', (t) => {
  const model = Model.of({ updated_at: '2015-10-05 20:15:10' });

  t.true(utc('2015-10-05 20:15:10').isSame(model.updatedAt));
  t.deepEqual(model.attributes, { updated_at: '2015-10-05 20:15:10' });
});

test('should get the attributes that have been changed', (t) => {
  const model = Model.of({ id: 1, created_at: '2015-10-05 05:10:15' });

  model.createdAt = utc('2015-10-05 20:15:10');

  t.deepEqual(model.dirty, { created_at: '2015-10-05 20:15:10' });
});

test('should throw a type error when id is not a number', (t) => {
  try {
    new Model({ id: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});

test('should throw a type error when createdAt is not a moment', (t) => {
  try {
    new Model({ createdAt: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});

test('should throw a type error when updatedAt is not a moment', (t) => {
  try {
    new Model({ updatedAt: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});
