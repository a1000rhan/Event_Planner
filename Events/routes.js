const express = require("express");
const routers = express.Router();
const {
  getEvents,
  getDetail,
  createEvent,
  deleteEvent,
  updateEvent,
  searchByName,
  fullyBooked,
} = require("./controller");

routers.get("/", getEvents);

routers.get("/full", fullyBooked);
routers.get("/s/:slug", searchByName);
routers.get("/d/:id", getDetail);
routers.post("/", createEvent);
routers.delete("/:id", deleteEvent);
routers.put("/:id", updateEvent);
module.exports = routers;
