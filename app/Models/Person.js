'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Person extends Model {
  static get table() {
    return 'persons'
  }

  static get primaryKey() {
    return 'person_id'
  }

  static boot() {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addTrait('ParseQuery', { searchableFields: ['person_name', 'id_card'] })
  }

  levels() {
    return this.hasMany('App/Models/User', 'person_id', 'person_id')
  }
}

module.exports = Person
