const db = require("../../data/dbConfig");
const go = require("../crud");
const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");

/**
 * This function's main purpose is to get All users from the database
 * @function getAll
 * @param {object} - req obj coming from client
 * @param {object} - res obj to send response to client
 *
 */

exports.getAll = async (req, res) => {
  try {
    const data = await db
      .table("users")
      .select("id", "email", "status", "role", "firstName", "lastName")
      .whereNot("email", "auth@gmail.com")
      .orderBy("created_at", "dec");

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Couldnt get users." });
  }
};

/**
 * This function's main purpose is to create users in the database
 * @function createUser
 * @param {object} - req obj coming from client
 * @param {object} - res obj to send response to client
 *
 */

exports.createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    //check if user exists with that email
    const user = await db("users")
      .select("*")
      .where("email", req.body.email);

    //if it exists send back 422 status code with error message
    if (user.length > 0) {
      return res
        .status(422)
        .json(`User already exists with email ${req.body.email}`);
    }

    if (!isLength(lastName, { min: 1 })) {
      return res.status(422).send("Last name can't be empty!");
    } else if (!isLength(firstName, { min: 1 })) {
      return res.status(422).send("First Name can't be empty");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }

    //create user
    const [id] = await go.createOne("users", "id", req.body);
    console.log(id);
    const data = await go.getById("users", id);
    delete data[0].password;
    //send back created User
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't create user", error: error });
  }
};

/**
 * This function's main purpose is to edit user by ID in the database
 * @function editUser
 * @param {object} - req obj coming from client
 * @param {object} - res obj to send response to client
 *
 */

exports.editUser = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    if (!isLength(lastName, { min: 1 })) {
      return res.status(422).send("Last name can't be empty!");
    } else if (!isLength(firstName, { min: 1 })) {
      return res.status(422).send("First Name can't be empty");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be valid");
    }

    await go.updateById("users", req.body, id);
    const data = await go.getById("users", id);

    delete data[0].password;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Couldn't update user", error: error });
  }
};

/**
 * This function's main purpose is to delete user by ID in the database
 * @function deleteUser
 * @param {object} - req obj coming from client
 * @param {object} - res obj to send response to client
 *
 */

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db
      .table("users")
      .del()
      .where("id", id);
    res.json({ message: "Successfully deleted user" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Unable to delete user" });
  }
};

// exports.getByDoctor= (req,res) => {

// }

// exports.getByAdmin = (req,res) => {

// }
// exports.getByAccountant = (req,res) => {

// }
