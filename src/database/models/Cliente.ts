// src/database/models/Cliente.ts
import { Model } from '@nozbe/watermelondb'
import { field, text, json } from '@nozbe/watermelondb/decorators'

// Interfaz para los productos del remito
export interface ProductoRemito {
    codigo: string;           // Código de barras del producto
    articulo: string;         // Nombre del artículo
    cantidad: number;         // Cantidad (bultos/unidades)
    empaque: 'Bulto' | 'Unidad'; // Tipo de empaque
    cxe: number;              // Cantidad por empaque
    precioUnitario: number;   // Precio por unidad
    montoTotal: number;       // Monto total (cantidad * precioUnitario)
}

export default class Cliente extends Model {
    static table = 'clientes'

    // === DATOS DEL CLIENTE ===
    @text('nombre') nombre!: string
    @text('direccion') direccion!: string
    @text('telefono') telefono?: string

    // === DATOS DEL REMITO ===
    @text('numero_remito') numeroRemito?: string // Ej: "201656"
    @text('codigo_cliente') codigoCliente?: string // Ej: "CARTEOS 336.100"

    // === PRODUCTOS DEL REMITO (JSON) ===
    @json('productos_remito', (rawProducts: any): ProductoRemito[] => {
        if (!rawProducts) return [];
        if (Array.isArray(rawProducts)) return rawProducts;
        return [];
    }) productosRemito?: ProductoRemito[];

    // === RESUMEN ===
    @field('total_remito') totalRemito?: number
    @field('cantidad_productos') cantidadProductos?: number

    // === DATOS COMERCIALES ===
    @text('categoria') categoria?: string
    @field('activo') activo?: boolean
    @field('saldo') saldo?: number

    // Método para obtener productos como array
    get productos(): ProductoRemito[] {
        return this.productosRemito || [];
    }

    // Método para calcular total automáticamente
    calcularTotalRemito(): number {
        if (!this.productosRemito) return 0;
        return this.productosRemito.reduce((total, producto) => {
            return total + (producto.montoTotal || 0);
        }, 0);
    }
}