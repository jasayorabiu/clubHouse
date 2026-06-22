const authService = require("../services/auth.service");
const passport = require("passport");

const signIn = async (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/sign-in",
    failureFlash: true,
  })(req, res);
};

const signUp = async (req, res) => {
  const { firstname, lastname, email, admin, password } = req.body;
  try {
    const user = await authService.signUp(
      firstname,
      lastname,
      email,
      admin,
      password,
    );
    res
      .status(201)
      .render("sign-in-form", {
        error: "",
        data: "You have signed up successfully!",
      });
  } catch (err) {
    res
      .status(500)
      .render("sign-up-form", {
        error: "Failed to sign up. Please try again." + err.message,
      });
  }
};

const signOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .render("index", {
          user: req.user,
          messages: [],
          error: "Failed to sign out. Please try again.",
        });
    }
    res.redirect("/auth/sign-in");
  });
};

const signInForm = (req, res) => {
  res.render("sign-in-form", { error: "" });
};

const signUpForm = (req, res) => {
  res.render("sign-up-form", { error: "" });
};

const activateMembership = async (req, res) => {
  const { code } = req.body;
  const user_id = req.user.id;
  try {
    await authService.activateMembership(user_id, code);
    res.redirect("/");
  } catch (err) {
    res
      .status(500)
      .render("index", {
        user: req.user,
        messages: [],
        error: "Failed to activate membership: " + err.message,
      });
  }
};

module.exports = {
  signIn,
  signUp,
  signOut,
  signInForm,
  signUpForm,
  activateMembership,
};
