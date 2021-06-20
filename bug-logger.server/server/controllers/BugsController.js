import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/notes', this.getNotesByBugId)
      .put('/:id', this.updateBug)
      .delete('/:id', this.deleteBug)
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const newBug = await bugsService.createBug(req.body)
      return res.send(newBug)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const bugs = await bugsService.getAll()
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const bug = await bugsService.getOne(req.params.id)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async updateBug(req, res, next) {
    try {
      req.body.id = req.params.id
      delete req.body.closed
      const bug = await bugsService.updateBug(req.body)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const notes = await notesService.getNotesByBugId({ bug: req.params.id })
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(req, res, next) {
    try {
      req.creator.id = req.userInfo.id
      await bugsService.deleteBug(req.body)
      return res
    } catch (error) {
      next(error)
    }
  }
}
