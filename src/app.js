const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use(errorHandler);

module.exports = app;
