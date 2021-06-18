import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const note = new Schema({
  body: { type: String, required: true },
  bug: { type: Object, ref: 'Bug', required: true },
  creatorId: { type: Object, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })
