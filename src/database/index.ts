import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { schema } from './schema'
import Cliente from './models/Cliente'

const adapter = new SQLiteAdapter({
  schema,
  dbName: 'santa_rita_db',
  onSetUpError: (error) => {
    console.error('Error en la base de datos:', error)
  }
})

export const database = new Database({
  adapter,
  modelClasses: [Cliente],
  actionsEnabled: true,
})
