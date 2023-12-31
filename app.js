const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const userRoutes = require('./routes/api/user'); 

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const authRouter = require("./routes/api/auth");
const recommendedFoodsRouter = require("./routes/api/recommendedFoods");
const userRouter = require("./routes/api/user");
const app = express();

app.use(express.json({ extended: true }));
app.use('/avatars', express.static(path.join(__dirname, "uploads", "avatars")));
app.use('/', userRoutes);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use("/api/recommended-food", recommendedFoodsRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
