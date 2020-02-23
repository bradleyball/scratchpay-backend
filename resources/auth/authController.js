const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");
const db = require("../../data/dbConfig");
require("dotenv").config();

/**
 * The function is an endpoint controller to sign in existing users.
 * @function signIn
 * @params {object} req - request object coming from the client
 * @params {object} res - response object returning to the client
 */

exports.signIn = async (req, res) => {
  try {
    //destructer email and password from body
    const { email, password } = req.body;
    //check database if user exists
    const user = await db("users")
      .select("*")
      .where("email", email);
    if (user.length === 0) {
      //return not found status if user does not exist
      return res.status(404).send("No user exists with that email");
    }

    //check if passwords match
    const passwordsMatch = await bcrypt.compare(password, user[0].password);
    delete user[0].password;
    if (passwordsMatch) {
      //if passwords match make token
      const token = jwt.sign({ user: user[0] }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      res.status(200).json({ token: token });
    } else {
      res.status(401).send("Passwords do not match");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in user");
  }
};

/**
 * The function is an endpoint controller to sign up non-existing users.
 * @function signUp
 * @params {object} req - request object coming from the client
 * @params {object} res - response object returning to the client
 */

exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  //check password strength
  if (!isLength(password, { min: 6 })) {
    return res.status(422).send("Password must be 6 characters long");
  } else if (!isEmail(email)) {
    return res.status(422).send("Email must be valid");
  }

  try {
    //check to see if user exists
    const user = await db("users")
      .select("*")
      .where("email", email);
    //if user exists send back error message
    if (user.length > 0) {
      return res.status(422).json(`User already exists with email ${email}`);
    }
    //if no user exists, hash password
    const hash = await bcrypt.hash(password, 10);
    req.body.password = hash;

    //create user
    const [id] = await db("users")
      .returning("id")
      .insert(req.body);
    //grab made user from database
    const newUser = await db("users")
      .select(
        "id",
        "email",
        "firstName",
        "lastName",
        "status",
        "role",
        "created_at"
      )
      .where("id", id);

    // create and send token with that newUser
    const token = jwt.sign({ user: newUser[0] }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    console.log(token);
    res.status(201).json({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing up user. Please try again");
  }
};
