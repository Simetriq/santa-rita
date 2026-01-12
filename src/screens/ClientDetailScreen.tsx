// src/screens/ClientDetailScreen.tsx
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../App'

type ClientDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ClientDetail'>

// Productos del remito 201656 que mostraste
const productosRemitoEjemplo = [
    { codigo: '7798134070178', nombre: 'JABON SIGNO BLANCO 48X200G', cantidad: 1, precio: 23544.88 },
    { codigo: '7791290733224', nombre: 'VELA COLOMBRINA CHICAS 50x64GR', cantidad: 1, precio: 55632.00 },
    { codigo: '7790411000050', nombre: 'YERBA ROSAMONTE TRAD 10X500GR', cantidad: 1, precio: 15805.58 },
    { codigo: '7790150630468', nombre: 'CHOCOLINO CACAO 12X500Gr', cantidad: 1, precio: 40706.57 },
    { codigo: '7796143962776', nombre: 'DURAZNO EN LATA HORVINDUL 12X820g', cantidad: 1, precio: 17136.00 },
]

export default function ClientDetailScreen() {
    const navigation = useNavigation<ClientDetailScreenNavigationProp>()
    const route = useRoute()
    const { clienteId } = route.params as { clienteId: string }

    const [cliente, setCliente] = useState<any>(null)
    const [productos, setProductos] = useState<any[]>([])

    useEffect(() => {
        // Encontrar el cliente por ID
        const clienteEncontrado = {
            id: '1',
            nombre: 'CABRAL MERELES ALBA',
            codigo: '336.100',
            direccion: 'B° DIVINO NIÑO - MZA 89 CASA 11 - FORMOSA',
            telefono: '3704598028',
            categoria: 'A',
            saldo: 0,
            ultimoRemito: '201656',
            totalRemito: 423451.91, // Suma de los productos del ejemplo
        }

        setCliente(clienteEncontrado)
        setProductos(productosRemitoEjemplo)
    }, [clienteId])

    const calcularTotal = () => {
        return productos.reduce((total, producto) => total + producto.precio, 0)
    }

    if (!cliente) {
        return (
            <View style={styles.centered}>
                <Text>Cargando...</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Información del cliente */}
                <View style={styles.card}>
                    <Text style={styles.clientName}>{cliente.nombre}</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Código:</Text>
                        <Text style={styles.infoValue}>{cliente.codigo}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Dirección:</Text>
                        <Text style={styles.infoValue}>{cliente.direccion}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Teléfono:</Text>
                        <Text style={styles.infoValue}>{cliente.telefono}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Categoría:</Text>
                        <Text style={styles.infoValue}>{cliente.categoria}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Último remito:</Text>
                        <Text style={styles.infoValue}>{cliente.ultimoRemito}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Total remito:</Text>
                        <Text style={[styles.infoValue, styles.totalValue]}>
                            ${calcularTotal().toLocaleString('es-AR')}
                        </Text>
                    </View>
                </View>

                {/* Productos del último remito */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Productos del remito {cliente.ultimoRemito}</Text>

                    {productos.map((producto, index) => (
                        <View key={index} style={styles.productItem}>
                            <View style={styles.productHeader}>
                                <Text style={styles.productName}>{producto.nombre}</Text>
                                <Text style={styles.productPrice}>
                                    ${producto.precio.toLocaleString('es-AR')}
                                </Text>
                            </View>
                            <View style={styles.productDetails}>
                                <Text style={styles.productCode}>Código: {producto.codigo}</Text>
                                <Text style={styles.productQuantity}>Cantidad: {producto.cantidad}</Text>
                            </View>
                        </View>
                    ))}

                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>TOTAL:</Text>
                        <Text style={styles.totalAmount}>
                            ${calcularTotal().toLocaleString('es-AR')}
                        </Text>
                    </View>
                </View>

                {/* Botones de acción */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => Alert.alert('Nuevo Remito', 'Funcionalidad en desarrollo')}
                    >
                        <Text style={styles.actionButtonText}>➕ Nuevo Remito</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.secondaryButton]}
                        onPress={() => Alert.alert('Ver todos', 'Todos los remitos del cliente')}
                    >
                        <Text style={styles.secondaryButtonText}>📋 Ver todos los remitos</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    clientName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
        fontSize: 16,
        color: '#6c757d',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: 16,
        color: '#495057',
        fontWeight: '400',
        textAlign: 'right',
        flex: 1,
        marginLeft: 10,
    },
    totalValue: {
        color: '#27ae60',
        fontWeight: 'bold',
        fontSize: 18,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 15,
        textAlign: 'center',
    },
    productItem: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    productName: {
        fontSize: 15,
        color: '#495057',
        flex: 1,
        marginRight: 10,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '600',
        color: '#27ae60',
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productCode: {
        fontSize: 13,
        color: '#6c757d',
        fontStyle: 'italic',
    },
    productQuantity: {
        fontSize: 13,
        color: '#6c757d',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 2,
        borderTopColor: '#e9ecef',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#27ae60',
    },
    actionsContainer: {
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#3498db',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButtonText: {
        color: '#3498db',
        fontSize: 16,
        fontWeight: '600',
    },
})