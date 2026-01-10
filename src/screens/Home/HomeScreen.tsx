import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { database } from '../../database'
import Cliente from '../../database/models/Cliente'

export default function HomeScreen() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        cargarClientes()
    }, [])

    const cargarClientes = async () => {
        try {
            const clientesCollection = database.collections.get<Cliente>('clientes')
            const todosClientes = await clientesCollection.query().fetch()
            setClientes(todosClientes)
        } catch (error) {
            console.error('Error cargando clientes:', error)
        } finally {
            setLoading(false)
        }
    }

    const agregarClienteDemo = async () => {
        await database.write(async () => {
            await database.collections.get<Cliente>('clientes').create(cliente => {
                cliente.nombre = `Cliente ${Date.now()}`
                cliente.telefono = '123456789'
                cliente.direccion = 'Dirección demo'
                cliente.categoria = 'A'
            })
        })
        cargarClientes()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Distribuidora Santa Rita</Text>
            <Text style={styles.subtitle}>CRM Offline - {clientes.length} clientes</Text>

            <Button title="Agregar Cliente Demo" onPress={agregarClienteDemo} />

            {loading ? (
                <Text>Cargando...</Text>
            ) : (
                <FlatList
                    data={clientes}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.clienteCard}>
                            <Text style={styles.clienteNombre}>{item.nombre}</Text>
                            <Text>Categoría: {item.categoria}</Text>
                            <Text>Tel: {item.telefono}</Text>
                        </View>
                    )}
                    style={styles.lista}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 10,
        color: '#2c3e50',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#7f8c8d',
    },
    lista: {
        marginTop: 20,
    },
    clienteCard: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    clienteNombre: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
})