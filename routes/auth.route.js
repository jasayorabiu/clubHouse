const {Router} = require('express');
const router = Router();
const authController = require('../controllers/auth.controller');

router.get('/sign-in', authController.signInForm);
router.get('/sign-up', authController.signUpForm);
router.post('/sign-in', authController.signIn);
router.post('/sign-up', authController.signUp);
router.get('/sign-out', authController.signOut);
router.post('/activate-membership', authController.activateMembership);

module.exports = router;