// src/database/models/Cliente.ts
import { Model } from '@nozbe/watermelondb'
import { field, text, json } from '@nozbe/watermelondb/decorators'

export interface ProductoRemito {
    codigo: string;
    articulo: string;
    cantidad: number;
    empaque: 'Bulto' | 'Unidad';
    cxe: number;
    precioUnitario: number;
    montoTotal: number;
}

export default class Cliente extends Model {
    static table = 'clientes'

    // === DATOS DEL CLIENTE ===
    @text('nombre') nombre!: string
    @text('direccion') direccion!: string
    @text('telefono') telefono?: string

    // === DATOS DEL REMITO ===
    @text('numero_remito') numeroRemito?: string
    @text('codigo_cliente') codigoCliente?: string

    // === PRODUCTOS DEL REMITO ===
    @json('productos_remito', (rawProducts: any): ProductoRemito[] => {
        return rawProducts || []
    }) productosRemito?: ProductoRemito[]

    // === RESUMEN ===
    @field('total_remito') totalRemito?: number
    @field('cantidad_productos') cantidadProductos?: number

    // === DATOS COMERCIALES ===
    @text('categoria') categoria?: string
    @field('activo') activo?: boolean
    @field('saldo') saldo?: number

    // === MÉTODOS HELPER ===

    // Método estático para crear un cliente
    static prepareCreate(clienteData: Partial<Cliente>) {
        return (cliente: Cliente) => {
            cliente.nombre = clienteData.nombre || ''
            cliente.direccion = clienteData.direccion || ''
            cliente.telefono = clienteData.telefono
            cliente.numeroRemito = clienteData.numeroRemito
            cliente.codigoCliente = clienteData.codigoCliente
            cliente.productosRemito = clienteData.productosRemito || []
            cliente.totalRemito = clienteData.totalRemito || 0
            cliente.cantidadProductos = clienteData.cantidadProductos || 0
            cliente.categoria = clienteData.categoria || 'A'
            cliente.activo = clienteData.activo ?? true
            cliente.saldo = clienteData.saldo || 0
        }
    }

    // Getters
    get productos(): ProductoRemito[] {
        return this.productosRemito || []
    }

    get totalCalculado(): number {
        return this.calcularTotalRemito()
    }

    // Método para calcular total
    calcularTotalRemito(): number {
        if (!this.productosRemito) return 0
        return this.productosRemito.reduce((total, producto) => {
            return total + (producto.montoTotal || 0)
        }, 0)
    }
}