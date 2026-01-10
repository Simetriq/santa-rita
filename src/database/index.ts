import { Database } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import { schema } from './schema'
import Cliente from './models/Cliente'

const adapter = new LokiJSAdapter({
    schema,
    dbName: 'santa_rita_db',
    // En Expo (managed) es mejor usar LokiJS en lugar del adaptador nativo sqlite
    useWebWorker: false,
    useIncrementalIndexedDB: false,
    onSetUpError: (error) => {
        console.error('Error en la base de datos:', error)
    }
})

export const database = new Database({
    adapter,
    modelClasses: [Cliente],
    actionsEnabled: true,
} as any)
