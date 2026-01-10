import { Model } from '@nozbe/watermelondb'
import { field, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Cliente extends Model {
    static table = 'clientes'

    @field('nombre') nombre!: string
    @field('telefono') telefono?: string
    @field('direccion') direccion?: string
    @field('categoria') categoria!: string

    @readonly @date('created_at') createdAt!: Date
    @readonly @date('updated_at') updatedAt!: Date
}