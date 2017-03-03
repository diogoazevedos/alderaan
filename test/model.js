/* eslint-disable no-new */

import test from 'ava';
import { utc, isMoment } from 'moment';
import Model from '../lib/model';

test('should instantiate a model with user provided data', (t) => {
  const attributes = {
    id: 20,
    createdAt: utc('2015-10-05 10:15:20'),
    updatedAt: utc('2015-10-05 20:15:10'),
    deletedAt: null,
  };

  const model = new Model(attributes);

  t.is(model.id, attributes.id);
  t.true(isMoment(model.createdAt));
  t.true(isMoment(model.updatedAt));
  t.deepEqual(model.attributes, {
    id: 20,
    created_at: '2015-10-05 20:15:10',
    updated_at: '2015-10-05 10:15:20',
    deleted_at: null,
  });
});

test('should instantiate a deleted model with user provided data', (t) => {
  const attributes = {
    id: 20,
    createdAt: utc('2015-10-05 20:15:10'),
    updatedAt: utc('2015-10-05 10:15:20'),
    deletedAt: utc('2015-10-05 10:15:20'),
  };

  const model = new Model(attributes);

  t.is(model.id, attributes.id);
  t.true(isMoment(model.createdAt));
  t.true(isMoment(model.updatedAt));
  t.deepEqual(model.attributes, {
    id: 20,
    created_at: '2015-10-05 20:15:10',
    updated_at: '2015-10-05 10:15:20',
    deleted_at: '2015-10-05 10:15:20',
  });
});

test('should instantiate a model with database provided data', (t) => {
  const attributes = {
    id: 20,
    created_at: '2015-10-05 20:15:10',
    updated_at: '2015-10-05 10:15:20',
    deleted_at: null,
  };

  const model = Model.of(attributes);

  t.is(model.id, attributes.id);
  t.is(model.deletedAt, null);
  t.true(isMoment(model.updatedAt));
  t.true(isMoment(model.createdAt));
  t.deepEqual(model.attributes, attributes);
});

test('should instantiate a deleted model with database provided data', (t) => {
  const attributes = {
    id: 20,
    created_at: '2015-10-05 20:15:10',
    updated_at: '2015-10-05 10:15:20',
    deleted_at: '2015-10-05 05:15:10',
  };

  const model = Model.of(attributes);

  t.is(model.id, attributes.id);
  t.true(isMoment(model.updatedAt));
  t.true(isMoment(model.createdAt));
  t.true(isMoment(model.deletedAt));
  t.deepEqual(model.attributes, attributes);
});

test('should throw a type error when id is not a string', (t) => {
  try {
    new Model({ id: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});

test('should throw a type error when createdAt is not a moment instance', (t) => {
  try {
    new Model({ createdAt: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});

test('should throw a type error when updatedAt is not a moment instance', (t) => {
  try {
    new Model({ updatedAt: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});

test('should throw an type error when deletedAt is not a moment instance and neither nil', (t) => {
  try {
    new Model({ deletedAt: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});
