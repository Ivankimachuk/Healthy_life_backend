const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.signupSchema), ctrl.signup);

router.post("/signin",authenticate, validateBody(schemas.signinSchema), ctrl.signin);

// router.post("/forgot-password", validateBody(schemas.forgotPasswordSchema), ctrl.forgot);

router.post("/signout", authenticate, ctrl.signout);

module.exports = router;
