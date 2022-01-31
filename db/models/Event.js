const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const EventSchema = new mongoose.Schema({
  organizer: { type: String, require: true },
  name: { type: String, require: true },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  image: { type: String },
  numOfSeats: { type: Number },
  bookedSeats: { type: Number },
  startDate: { type: Date, min: Date() },
  endDate: { type: Date, min: Date() },
});
EventSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Event", EventSchema);
