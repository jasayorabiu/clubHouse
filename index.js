require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./pool');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const path = require('node:path');
const authService = require('./services/auth.service');
const messageRoutes = require('./routes/messages.route');
const authRoutes = require('./routes/auth.route');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

passport.use(new LocalStrategy(
  async (username, password, done) => {
    await authService.signIn(username, password, done);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = result.rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
}); 


app.use('/', messageRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;      
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}: http://localhost:${PORT}`);
});