const express = require("express");
const bodyParser = require("body-parser");

const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-route");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes); //=> /api/places
app.use("/api/users", usersRoutes); //=> /api/users

app.use((req, res, next) => {
  const error = new HttpError("Could not find that route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong with the server" });
});

app.listen(5000);
