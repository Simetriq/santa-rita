// src/screens/HomeScreen.tsx
import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../App'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

// Datos de ejemplo
const clientesEjemplo = [
    {
        id: '1',
        nombre: 'CABRAL MERELES ALBA',
        codigo: '336.100',
        direccion: 'B° DIVINO NIÑO - MZA 89 CASA 11 - FORMOSA',
        telefono: '3704598028',
        ultimoRemito: '201656'
    },
    {
        id: '2',
        nombre: 'Armando Lorenzo',
        codigo: 'AL-001',
        direccion: 'Calle Falsa 123',
        telefono: '3704000001',
        ultimoRemito: '201655'
    },
    {
        id: '3',
        nombre: 'Barrios Tobias',
        codigo: 'BT-002',
        direccion: 'Av. Siempre Viva 456',
        telefono: '3704000002',
        ultimoRemito: '201654'
    },
]

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const [searchText, setSearchText] = useState('')

    // Filtrar y ordenar clientes
    const clientesFiltrados = searchText
        ? clientesEjemplo.filter(cliente =>
            cliente.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
            cliente.codigo.toLowerCase().includes(searchText.toLowerCase())
        )
        : clientesEjemplo

    const clientesOrdenados = [...clientesFiltrados].sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
    )

    const handleClientPress = (clienteId: string) => {
        navigation.navigate('ClientDetail', { clienteId })
    }

    const handleAddClient = () => {
        navigation.navigate('AddClient')
    }

    const renderClientItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.clientCard}
            onPress={() => handleClientPress(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.clientInfo}>
                <Text style={styles.clientName}>{item.nombre}</Text>
                <Text style={styles.clientCode}>Código: {item.codigo}</Text>
                <Text style={styles.clientRemito}>Último remito: {item.ultimoRemito}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={styles.container}>
            {/* Header con título */}
            <View style={styles.header}>
                <Text style={styles.title}>Santa Rita</Text>
            </View>

            {/* Buscador */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nombre o código..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={setSearchText}
                    autoCapitalize="words"
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')}>
                        <Text style={styles.clearIcon}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Contador de resultados */}
            <View style={styles.resultsContainer}>
                <Text style={styles.resultsText}>
                    {clientesOrdenados.length} {clientesOrdenados.length === 1 ? 'cliente' : 'clientes'}
                    {searchText ? ` para "${searchText}"` : ''}
                </Text>
            </View>

            {/* Lista A-Z */}
            <View style={styles.listHeader}>
                <Text style={styles.listTitle}>A-Z</Text>
                <View style={styles.divider} />
            </View>

            <FlatList
                data={clientesOrdenados}
                renderItem={renderClientItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>👤</Text>
                        <Text style={styles.emptyText}>
                            {searchText
                                ? `No se encontraron clientes para "${searchText}"`
                                : 'No hay clientes registrados'}
                        </Text>
                        {!searchText && (
                            <TouchableOpacity
                                style={styles.emptyButton}
                                onPress={handleAddClient}
                            >
                                <Text style={styles.emptyButtonText}>Agregar primer cliente</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                }
            />

            {/* Botón flotante para agregar cliente */}
            <TouchableOpacity
                style={styles.fab}
                onPress={handleAddClient}
                activeOpacity={0.8}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#3498db',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 15,
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        fontSize: 18,
        color: '#999',
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    clearIcon: {
        fontSize: 18,
        color: '#999',
        padding: 5,
    },
    resultsContainer: {
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    resultsText: {
        fontSize: 14,
        color: '#6c757d',
        fontStyle: 'italic',
    },
    listHeader: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 5,
    },
    listTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 5,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    listContent: {
        paddingBottom: 80,
    },
    clientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 5,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    clientInfo: {
        flex: 1,
    },
    clientName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2c3e50',
        marginBottom: 3,
    },
    clientCode: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 2,
    },
    clientRemito: {
        fontSize: 13,
        color: '#95a5a6',
        fontStyle: 'italic',
    },
    chevron: {
        fontSize: 24,
        color: '#adb5bd',
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 40,
    },
    emptyIcon: {
        fontSize: 50,
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#95a5a6',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    emptyButton: {
        backgroundColor: '#3498db',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    emptyButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    fabText: {
        fontSize: 28,
        color: '#fff',
        fontWeight: '300',
        marginTop: -2,
    },
})