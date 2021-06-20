import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async createNote(body) {
    const res = await api.post('api/notes', body)
    AppState.notes = res.data
    return res
  }
}

export const notesService = new NotesService()
