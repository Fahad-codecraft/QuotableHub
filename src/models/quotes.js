import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const quoteSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(11),
  },
  Quote: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Tags: {
    type: [String],
    default: [],
  },
  length: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
  },
});

quoteSchema.pre('save', function (next) {
  if (this.Quote) {
    this.length = this.Quote.length;
  }
  next();
});

const Quoteschema = mongoose.model('Quoteschema', quoteSchema);
export default Quoteschema;
