const express = require("express");
const eventsRoute = require("./Events/routes");
const connectDB = require("./db/database");

const app = express();
app.use(express.json());

connectDB();

app.use("/events", eventsRoute);
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
