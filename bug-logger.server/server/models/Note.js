import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const Note = new Schema({
  body: { type: String, required: true },
  bug: { type: Object, ref: 'Bug', required: true },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Note.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
