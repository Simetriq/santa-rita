// App.tsx - VERSIÓN COMPLETA CON NAVEGACIÓN
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import ClientDetailScreen from './src/screens/ClientDetailScreen'
import AddClientScreen from './src/screens/AddClientScreen'

// Tipos para TypeScript
export type RootStackParamList = {
  Home: undefined
  ClientDetail: { clienteId: string }
  AddClient: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: '#f8f9fa',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Santa Rita',
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="ClientDetail"
          component={ClientDetailScreen}
          options={{
            title: 'Detalle Cliente',
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="AddClient"
          component={AddClientScreen}
          options={{
            title: 'Agregar Cliente',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#27ae60', // Verde para diferenciar
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}