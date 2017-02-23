/* eslint-disable no-new */

import test from 'ava';
import { utc } from 'moment';
import Model from '../lib/model';
import { isMoment } from '../lib/validator';

test('should instantiate a model with user provided data', (t) => {
  const attributes = {
    id: 20,
    createdAt: utc('2015-10-05 20:15:10'),
    updatedAt: utc('2015-10-05 10:15:20'),
  };

  const model = new Model(attributes);

  t.is(model.id, attributes.id);
  t.true(isMoment(model.createdAt));
  t.true(isMoment(model.updatedAt));
  t.deepEqual(model.attributes, {
    id: 20,
    created_at: '2015-10-05 20:15:10',
    updated_at: '2015-10-05 10:15:20',
  });
});

test('should instantiate a model with database provided data', (t) => {
  const attributes = {
    id: 20,
    created_at: '2015-10-05 20:15:10',
    updated_at: '2015-10-05 10:15:20',
  };

  const model = Model.of(attributes);

  t.is(model.id, attributes.id);
  t.true(isMoment(model.updatedAt));
  t.true(isMoment(model.createdAt));
  t.deepEqual(model.attributes, attributes);
});

test('should throw an error when id is not a string', (t) => {
  try {
    new Model({ id: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});

test('should throw an error when createdAt is not a moment instance', (t) => {
  try {
    new Model({ createdAt: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});

test('should throw an error when updatedAt is not a moment instance', (t) => {
  try {
    new Model({ updatedAt: 'foo' });
  } catch (error) {
    t.true(error instanceof TypeError);
  }
});
