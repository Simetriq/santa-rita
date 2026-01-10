import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'clientes',
            columns: [
                { name: 'nombre', type: 'string' },
                { name: 'telefono', type: 'string', isOptional: true },
                { name: 'direccion', type: 'string', isOptional: true },
                { name: 'categoria', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
            ]
        })
    ]
})