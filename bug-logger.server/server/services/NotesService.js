import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getNotesByBugId(id = {}) {
    return await dbContext.Notes.find(id)
      .populate('creator', 'name picture')
  }

  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator', 'name picture').execPopulate()
    return note
  }

  async deleteNote(id, userId) {
    const note = await dbContext.Notes.findOneAndDelete({ _id: id, creatorId: userId })
    if (!note) throw new BadRequest('bad request')
    return note
  }
}

export const notesService = new NotesService()
