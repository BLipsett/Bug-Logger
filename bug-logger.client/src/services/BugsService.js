import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Notification from '../utils/Notification'
import { api } from './AxiosService'

class BugsService {
  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs', newBug)
      AppState.bugs = res.data
      logger.log(res)
      this.getBugs()
    } catch (error) {
      Notification.toast('service error', error)
    }
  }

  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async setActiveBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async getNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
    logger.log(AppState.notes)
  }

  async closeBug(id, body) {
    const res = await api.delete('api/bugs/' + id, body)
    logger.log('close bug', res)
    AppState.bugs = res.data
  }
}

export const bugsService = new BugsService()
