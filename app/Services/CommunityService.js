const Service = use('App/Services/Service')
const Model = use('App/Models/Community')

class CommunityService extends Service {
  static async getAll(params, user) {
    const { page, perPage, includes = 'subdistrict' } = params
    const model = Model.parseQuery(params)

    const query = await model.paginate(page, perPage)

    return await query.toJSON()
  }

  static async getById(id, params = {}) {
    const query = await Model.parseQuery(params)
      .where('comm_id', id)
      .first()

    return query.toJSON()
  }

  static async create(payload) {
    const query = await Model.create(payload)

    return query.toJSON()
  }

  static async update(id, payload) {
    const query = await Model.findOrFail(id)

    query.merge(payload)

    await query.save()

    return query.toJSON()
  }

  static async delete(id) {
    const model = await Model.findOrFail(id)

    const query = await model.delete()

    return query.toJSON()
  }
}

module.exports = CommunityService
