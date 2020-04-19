const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  date: { type: Date, required: true },
  happy: { type: Boolean },
  content: { type: String, required: true },
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;