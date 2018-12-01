'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.table('tasks', (table) => {
      table.boolean('completed').defaultTo(false)
    })
  }

  down () {
    this.table('tasks', (table) => {
      table.dropColumn('completed')
    })
  }
}

module.exports = TaskSchema
