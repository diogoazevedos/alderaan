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
  const model = new Model({ createdAt: utc('2015-10-05T05:10:15Z') });

  t.true(utc('2015-10-05T05:10:15Z').isSame(model.createdAt));
});

test('should create a model with a database created_at', (t) => {
  const model = Model.of({ created_at: new Date('2015-10-05T05:10:15Z') });

  t.true(utc('2015-10-05T05:10:15Z').isSame(model.createdAt));
});

test('should create a model with a valid updated_at', (t) => {
  const model = new Model({ updatedAt: utc('2015-10-05T20:15:10Z') });

  t.true(utc('2015-10-05T20:15:10Z').isSame(model.updatedAt));
});

test('should create a model with a database updated_at', (t) => {
  const model = Model.of({ updated_at: new Date('2015-10-05T20:15:10Z') });

  t.true(utc('2015-10-05T20:15:10Z').isSame(model.updatedAt));
});

test('should get the attributes that have been changed', (t) => {
  const model = Model.of({ id: 1 });

  model.id = 10;

  t.deepEqual(model.dirty, { id: 10 });
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
