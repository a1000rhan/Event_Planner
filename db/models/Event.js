const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const EventSchema = new mongoose.Schema({
  organizer: { type: String, maxlength: 20, require: true, unique: true },
  name: {
    type: String,
    require: true,
    validate: [
      function (value) {
        return !value.includes("event");
      },
    ],
  },
  email: {
    type: String,
    require: true,

    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  image: { type: String, require: true },
  numOfSeats: { type: Number, max: 5 },
  bookedSeats: {
    type: Number,
    default: 0,
    max: this.numOfSeats,
    validate: [
      function (value) {
        return this.numOfSeats >= value;
      },
    ],
  },
  startDate: { type: Date, min: Date() + 1 },
  endDate: {
    type: Date,
    min: this.startDate,
    validate: [
      function (value) {
        return value > this.startDate;
      },
    ],
  },
});
EventSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Event", EventSchema);
