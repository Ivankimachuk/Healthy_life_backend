const express = require("express");

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const router = express.Router();

router.post("/signup", validateBody(schemas.signupSchema), ctrl.signup);

router.post("/signin", validateBody(schemas.signinSchema), ctrl.signin);


// router.get("/current", authenticate, ctrl.getCurrent);

router.post("/signout", authenticate, ctrl.signout);

module.exports = router;
