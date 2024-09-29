const db = require("../config/config");

// Create User Table if it doesn't exist

const createUserTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255),
            token_balance INT DEFAULT 6,
            is_paid BOOLEAN DEFAULT false,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
    `;
  try {
    await db.query(query);
    console.log("User table created");
  } catch (error) {
    console.error("Error creating user table:", error);
  }
};

//Function to create new user

const createUser = async (email, username, password) => {
  const query = `
    INSERT INTO users (email, username, password) 
    VALUES ($1, $2, $3) RETURNING *;
`;

  const values = [email, username, password];
  try {
    const res = await db.query(query, values);
    return res.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  try {
    const res = await db.query(query, [email]);
    return res.rows[0];
  } catch (error) {
    console.log("Error finding user by email:", error);
    throw error;
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  createUserTable,
};
