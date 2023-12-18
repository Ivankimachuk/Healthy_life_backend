const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");
const recommendedFoodsRouter = require("./routes/api/recommendedFoods");
const intakesWaterRouter = require("./routes/api/waterIntakes");
// const weightRouter = require("./routes/api/weight");
// const weightRouter = require("./routes/api/weight");
const weightRouter = require("./routes/api/weight");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);

app.use("/api/recommended-food", recommendedFoodsRouter);
app.use("/api/user/water-intake", intakesWaterRouter);
app.use("/api/user/weight", weightRouter);
// app.use("/api/user/weight", weightRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
