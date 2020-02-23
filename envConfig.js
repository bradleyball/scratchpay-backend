require("dotenv").config();

/**
 * getDB conditionally returns depending on environment
 * @function getDB
 * @returns {string} - returns DB URI
 */

const getDB = () => {
  if (process.env.DB_ENV === "testing") {
    return process.env.TEST_DB_URI;
  } else {
    return process.env.DATABASE_URL;
  }
};

exports.module = getDB();
