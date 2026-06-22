const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clubhousedb',
  password: 'password1234',
  port: 5432,
});

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// })

module.exports = pool;