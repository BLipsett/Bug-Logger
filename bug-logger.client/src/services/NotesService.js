import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async createNote(body) {
    const res = await api.post('api/notes', body)
    AppState.notes = res.data
    return res
  }

  async deleteNote(id) {
    const res = await api.delete('api/notes/' + id)
    AppState.notes = res.data
  }
}

export const notesService = new NotesService()
