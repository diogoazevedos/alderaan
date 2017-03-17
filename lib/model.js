const { assign } = Object;
const { utc } = require('moment');
const { clone, difference, toPairs, fromPairs } = require('ramda');
const { ISO8601 } = require('./constant');
const { isNotNumber, isNotMoment } = require('./helper');

class Model {
  /**
   * Create a new model instance.
   *
   * @param  {Object} attributes
   * @return {Void}
   */
  constructor(attributes) {
    this.original = {};
    this.attributes = {};

    assign(this, attributes);
  }

  /**
   * Set the model id.
   *
   * @param  {Number} value
   * @return {Void}
   */
  set id(value) {
    if (isNotNumber(value)) {
      throw new TypeError('The id must be a number');
    }

    this.attributes.id = value;
  }

  /**
   * Get the model id.
   *
   * @return {Number}
   */
  get id() {
    return this.attributes.id;
  }

  /**
   * Set the model createdAt.
   *
   * @param  {Moment} value
   * @return {Void}
   */
  set createdAt(value) {
    if (isNotMoment(value)) {
      throw new TypeError('The createdAt must be an instance of moment');
    }

    this.attributes.created_at = value.format(ISO8601);
  }

  /**
   * Get the model createdAt.
   *
   * @return {Moment}
   */
  get createdAt() {
    return utc(this.attributes.created_at, ISO8601);
  }

  /**
   * Set the model updatedAt.
   *
   * @param  {Moment} value
   * @return {Void}
   */
  set updatedAt(value) {
    if (isNotMoment(value)) {
      throw new TypeError('The updatedAt must be an instance of moment');
    }

    this.attributes.updated_at = value.format(ISO8601);
  }

  /**
   * Get the model updatedAt.
   *
   * @return {Moment}
   */
  get updatedAt() {
    return utc(this.attributes.updated_at, ISO8601);
  }

  /**
   * Create a new model instance with plain attributes.
   *
   * @param  {Object} attributes
   * @return {Model}
   */
  static of(attributes) {
    const model = new this();
    model.original = clone(attributes);
    model.attributes = attributes;

    return model;
  }

  /**
   * Get the attributes that have been changed since last sync.
   *
   * @return {Object}
   */
  get dirty() {
    const attributes = toPairs(this.attributes);
    const original = toPairs(this.original);

    return fromPairs(difference(attributes, original));
  }
}

module.exports = Model;
