const express = require("express");
const { updateWeight } = require("../../controllers/weight");
// const { validateBody, authenticate } = require("../../middlewares");
// const { schemaWeight } = require("../../models/weightModel");
// const { ctrlWrapper } = require("../../utils");
const router = express.Router();

router.patch("/", updateWeight);

module.exports = router;

// const express = require("express");
// // const { authenticate } = require("../../middlewares");

// const router = express.Router();

// const { addWeight } = require("../../controllers/weight");

// router.post("/", addWeight);

// module.export = router;
