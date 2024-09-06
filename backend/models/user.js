const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { BadRequestError, UnauthorizedError, NotFoundError } = require("../expressError");

class User {
  // Method to register a new user
  static async register({ username, password, firstName, lastName, email }) {
    // Check for duplicate username or email
    const duplicateCheck = await db.query(
      `SELECT username, email
       FROM users
       WHERE username = $1 OR email = $2`,
      [username, email]
    );

    if (duplicateCheck.rows[0]) {
      console.error(`Duplicate username or email: ${username}, ${email}`); // Add logging
      throw new BadRequestError(`Duplicate username or email: ${username}, ${email}`);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // Insert the new user into the database
    const result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
      [username, hashedPassword, firstName, lastName, email]
    );

    const user = result.rows[0];
    console.log(`User registered: ${username}`); // Add logging
    return user;
  }

  // Method to authenticate a user
  static async authenticate(username, password) {
    // Retrieve the user from the database
    const result = await db.query(
      `SELECT username, password, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"
       FROM users
       WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      console.error(`Invalid username: ${username}`); // Add logging
      throw new UnauthorizedError("Invalid username or password");
    }

    // Compare the provided password with the stored hashed password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      console.error(`Invalid password for username: ${username}`); // Add logging
      throw new UnauthorizedError("Invalid username or password");
    }

    delete user.password;
    console.log(`User authenticated: ${username}`); // Add logging
    return user;
  }

  // Method to fetch user details
  static async get(username) {
    // Retrieve the user details from the database
    const result = await db.query(
      `SELECT username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"
       FROM users
       WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (!user) {
      console.error(`No user found: ${username}`); // Add logging
      throw new NotFoundError(`No user: ${username}`);
    }

    console.log(`User details retrieved: ${username}`); // Add logging
    return user;
  }
}

module.exports = User;