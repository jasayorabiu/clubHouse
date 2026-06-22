const pool = require("../pool");
const bcrypt = require("bcryptjs");

const signUp = async (firstname, lastname, email, admin, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (firstname,lastname,email, admin, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstname, lastname, email, admin, hashedPassword],
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

const signIn = async (email, password, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const activateMembership = async (user_id, code) => {
  const validCode = "SECRETCODE123";
  if (code !== validCode) {
    throw new Error("Invalid membership code");
  }
  try {
    const result = await pool.query(
      "UPDATE users SET membership_status = true WHERE id = $1 RETURNING *",
      [user_id],
    );
    return result.rows[0];
  } catch (err) {
    throw new Error("Failed to activate membership: " + err.message);
  }
};

module.exports = {
  signUp,
  signIn,
  activateMembership,
};
