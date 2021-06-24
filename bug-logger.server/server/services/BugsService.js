import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async createBug(body) {
    const bug = await dbContext.Bugs.create(body)
    await bug.populate('creator', 'name picture').execPopulate()
    return bug
  }

  async getAll(query = {}) {
    return await dbContext.Bugs.find(query)
      .populate('creator', 'name picture')
  }

  async getOne(id) {
    return await dbContext.Bugs.findById({ _id: id })
      .populate('creator', 'name picture')
  }

  async updateBug(body) {
    body.closed = false
    delete body.creatorId
    const bug = await this.getOne(body.id)
    if (bug.closed === true) {
      throw new BadRequest('Invalid Id')
    }
    const newBug = await dbContext.Bugs.findOneAndUpdate({ _id: body.id }, body, { new: true })
      .populate('creator', 'name picture')
    return newBug
  }

  async deleteBug(bugId, data) {
    data = { closed: true }
    const bug = await dbContext.Bugs.findByIdAndUpdate(bugId, data, { new: true, runValidators: true })
    return bug
  }
}

export const bugsService = new BugsService()
