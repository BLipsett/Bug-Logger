import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const bug = new Schema({
  closed: { type: Boolean, required: true, default: false },
  description: { type: String, required: true },
  title: { type: String, required: true },
  closedDate: { type: Date },
  creatorId: { type: Object, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })
