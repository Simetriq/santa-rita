// src/database/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'clientes',
            columns: [
                // Datos básicos
                { name: 'nombre', type: 'string' },
                { name: 'direccion', type: 'string' },
                { name: 'telefono', type: 'string', isOptional: true },

                // Datos del remito
                { name: 'numero_remito', type: 'string', isOptional: true },
                { name: 'codigo_cliente', type: 'string', isOptional: true },

                // Productos (JSON)
                { name: 'productos_remito', type: 'string', isOptional: true },

                // Resumen
                { name: 'total_remito', type: 'number', isOptional: true },
                { name: 'cantidad_productos', type: 'number', isOptional: true },

                // Datos comerciales
                { name: 'categoria', type: 'string', isOptional: true },
                { name: 'activo', type: 'boolean', isOptional: true },
                { name: 'saldo', type: 'number', isOptional: true },
            ]
        }),
    ]
})

export default schema