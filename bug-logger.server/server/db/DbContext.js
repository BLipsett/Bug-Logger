import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { Bug as BugsSchema } from '../models/Bug'
import { Note as NotesSchema } from '../models/Note'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Bugs = mongoose.model('Bug', BugsSchema);

  Notes = mongoose.model('Note', NotesSchema);
}

export const dbContext = new DbContext()
