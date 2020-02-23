const db = require("../data/dbConfig");

/**
 * @function createOne
 * @param {string} - name of table you wish to access
 * @param {string} - columns you want to return
 * @param {object} - data to be inserted into the database
 */

exports.createOne = (table, returning, object) => {
  return db(table)
    .returning(returning)
    .insert(object);
};

/**
 * @function getMany
 * @param {string} - name of table you wish to access
 * @param {string} - columns you want to be returned
 */

exports.getMany = (table, ...columns) => {
  return db(table).select(columns ? columns : "*");
};

/**
 * @function createOne
 * @param {string} - name of table you wish to access
 * @param {number} - id of record you want to returned
 */

exports.getById = (table, id, ...columns) => {
  return db(table)
    .select(columns ? columns : "*")
    .where("id", id);
};

/**
 * @function updatesById
 * @param {string} - name of table you wish to access
 * @param {object} - object with updated info
 * @param {number} - data to be inserted into the database
 */

exports.updateById = (table, object, id) => {
  return db(table)
    .update(object)
    .where("id", id);
};
