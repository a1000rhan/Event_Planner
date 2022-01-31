const express = require("express");
const routers = express.Router();
const {
  getEvents,
  getDetail,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("./controller");

routers.get("/", getEvents);

//return one product based on id #
routers.get("/:id", getDetail);

routers.post("/", createEvent);
routers.delete("/:id", deleteEvent);
routers.put("/:id", updateEvent);
module.exports = routers;
