const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, requried: true },
  email: { type: String, required: true },
  event: { type: String, required: true },
  additional_guests: { type: String, required: false },
  holiday: { type: Boolean, required: false },
  startDate: { type: Date, required: false },
  endDate: { type: Date, required: false }
}, {
  collection: 'guests',
  versionKey: false
});


const Guest = mongoose.model('Guest', guestSchema);
module.exports = Guest;

