// App.tsx
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { database } from './src/database'
import HomeScreen from './src/screens/Home/HomeScreen'

export default function App() {
  const [dbReady, setDbReady] = useState(false)

  useEffect(() => {
    const initDB = async () => {
      try {
        // Esperar a que la base de datos esté lista
        await database.adapter.getLocal('init')
        setDbReady(true)
        console.log('✅ Base de datos lista')
      } catch (error) {
        console.log('Base de datos inicializada')
        setDbReady(true)
      }
    }

    initDB()
  }, [])

  if (!dbReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Inicializando base de datos...</Text>
      </View>
    )
  }

  return <HomeScreen />
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
})