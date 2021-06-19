import { dbContext } from '../db/DbContext'

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
    return await dbContext.Bugs.findOneAndUpdate({ _id: body.id }, body, { new: true })
  }

  async deleteBug(body) {
    return await dbContext.Bugs.findByIdAndUpdate({ _id: body.id }, body, { new: true })
  }
}

export const bugsService = new BugsService()
