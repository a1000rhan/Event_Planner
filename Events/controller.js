const Event = require("../db/models/Event");

exports.getEvents = async (req, res) => {
  try {
    const eventsArray = await Event.find();
    res.json(eventsArray);
    res.status(200).end();
  } catch (e) {
    res.status(500).json({ message: e.massage });
  }
};

exports.getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const oneEvent = await Event.findById({ _id: id });

    res.json(oneEvent);

    res.status(200).end();
  } catch (e) {
    res.status(500).json({ message: e.massage });
  }
};

exports.fullyBooked = async (req, res) => {
  try {
    const oneEvent = await Event.find({
      $expr: { $eq: ["$numOfSeats", "$bookedSeats"] },
    });

    res.json(oneEvent);

    res.status(200).end();
  } catch (e) {
    res.status(500).json({ message: e.massage });
  }
};

exports.searchByName = async (req, res) => {
  try {
    const { slug } = req.params;
    const oneEvent = await Event.find({ slug: slug });

    res.json(oneEvent);

    res.status(200).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.createEvent = async (req, res) => {
  console.log(req.body);
  try {
    const newEvent = await Event.create(req.body);

    res.json(newEvent);
    res.status(201).end();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const foundEvent = await Event.findByIdAndDelete({ _id: id });
    if (foundEvent) {
      // products = products.filter((prod) => prod.id !== +id);
      res.status(204).end().json({ message: "deleted" });
    } else {
      res.status(404).end().json({ message: "no found" });
    }
  } catch (e) {
    res.status(500).json({ massage: e.massage });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    //new:true to to show the update after change immiditly
    const event = await Event.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (event) {
      res.json(event);
      //res.status(200).end();// by defualt 200
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
