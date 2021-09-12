const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());

const loginRoute = require("./routes/login");
const suggestionRoute = require("./routes/suggestion");
const dataRoute = require("./routes/data");

app.use(cors());
app.use("/api/v1/login", loginRoute);
app.use("/api/v1/suggest", suggestionRoute);
app.use("/api/v1/data", dataRoute);

app.get("/", (req, res) => {
  res.send("Stocks api works");
});

module.exports = app;
