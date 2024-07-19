const { Schema, model } = require("mongoose");

const schema = new Schema({
  date: {
    year: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    }
  },
  time: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  phone: {
    type: String
  }
});

module.exports = model("Reservation", schema, 'reservations');