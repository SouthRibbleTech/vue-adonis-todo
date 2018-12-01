'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.table('tasks', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.table('tasks', (table) => {
      table.dropColumn('user_id')
    })
  }
}

module.exports = TaskSchema
