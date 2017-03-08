const { map, head, maybeToNullable } = require('sanctuary');
const { bind } = require('ramda');

class Repository {
  /**
   * Create a new repository instance.
   *
   * @param  {String} table
   * @param  {Model}  model
   * @return {Void}
   */
  constructor(table, model) {
    this.table = table;
    this.model = model;
    this.factory = bind(model.of, model);
  }

  /**
   * Fetch all resources.
   *
   * @param  {Knex} db
   * @return {Promise<Array>}
   */
  all(db) {
    return db(this.table)
      .then(map(this.factory));
  }

  /**
   * Find a specific resource.
   *
   * @param  {Knex}   db
   * @param  {Number} id
   * @return {Promise<Maybe>}
   */
  find(db, id) {
    return db(this.table)
      .where({ id })
      .then(head)
      .then(map(this.factory));
  }

  /**
   * Store the resource in storage.
   *
   * @param  {Knex}  db
   * @param  {Model} model
   * @return {Promise<Model>}
   */
  create(db, model) {
    return db(this.table)
      .insert(model.attributes)
      .then(([id]) => this.find(db, id))
      .then(maybeToNullable);
  }

  /**
   * Delete a specific resource.
   *
   * @param  {Knex}   db
   * @param  {Number} id
   * @return {Void}
   */
  destroy(db, id) {
    return db(this.table)
      .where({ id })
      .delete();
  }
}

module.exports = Repository;
