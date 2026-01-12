// src/screens/AddClientScreen.tsx
import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../App'

type AddClientScreenNavigationProp = StackNavigationProp<RootStackParamList>

export default function AddClientScreen() {
  const navigation = useNavigation<AddClientScreenNavigationProp>()
  
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState('')
  const [codigo, setCodigo] = useState('')
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [barrio, setBarrio] = useState('')
  const [manzana, setManzana] = useState('')
  const [casa, setCasa] = useState('')
  const [ciudad, setCiudad] = useState('Formosa') // Valor por defecto
  const [categoria, setCategoria] = useState('A') // Valor por defecto
  
  // Validación de campos
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  // Categorías disponibles
  const categorias = ['A', 'B', 'C', 'D']
  
  // Validar formulario
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio'
    }
    
    if (!codigo.trim()) {
      newErrors.codigo = 'El código es obligatorio'
    }
    
    if (!direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // Función para guardar cliente
  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor complete los campos obligatorios')
      return
    }
    
    try {
      // Crear objeto cliente
      const nuevoCliente = {
        nombre: nombre.trim(),
        codigo: codigo.trim(),
        direccion: direccion.trim(),
        telefono: telefono.trim() || null,
        barrio: barrio.trim() || null,
        manzana: manzana.trim() || null,
        casa: casa.trim() || null,
        ciudad: ciudad.trim(),
        categoria,
        saldo: 0,
        activo: true,
        numeroRemito: null,
        productosRemito: [],
        totalRemito: 0,
        cantidadProductos: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      // TODO: Guardar en WatermelonDB
      console.log('Guardando cliente:', nuevoCliente)
      
      // Simular guardado
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mostrar éxito y regresar
      Alert.alert(
        'Éxito',
        'Cliente agregado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      )
      
    } catch (error) {
      console.error('Error al guardar cliente:', error)
      Alert.alert('Error', 'No se pudo guardar el cliente')
    }
  }
  
  // Función para limpiar formulario
  const handleClear = () => {
    Alert.alert(
      'Limpiar formulario',
      '¿Está seguro de que desea limpiar todos los campos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpiar', 
          style: 'destructive',
          onPress: () => {
            setNombre('')
            setCodigo('')
            setDireccion('')
            setTelefono('')
            setBarrio('')
            setManzana('')
            setCasa('')
            setCiudad('Formosa')
            setCategoria('A')
            setErrors({})
          }
        }
      ]
    )
  }
  
  // Renderizar campo de formulario
  const renderField = (
    label: string,
    value: string,
    onChange: (text: string) => void,
    placeholder: string,
    error?: string,
    required: boolean = false,
    keyboardType: 'default' | 'numeric' | 'phone-pad' = 'default'
  ) => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
      <TextInput
        style={[
          styles.input,
          error ? styles.inputError : null,
          keyboardType === 'numeric' ? styles.inputNumeric : null,
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
      />
    </View>
  )
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agregar Cliente</Text>
          <TouchableOpacity 
            onPress={handleClear}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Información básica */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Básica</Text>
            
            {renderField(
              'Nombre completo',
              nombre,
              setNombre,
              'Ej: CABRAL MERELES ALBA',
              errors.nombre,
              true
            )}
            
            {renderField(
              'Código de cliente',
              codigo,
              setCodigo,
              'Ej: 336.100, SALADO + 300',
              errors.codigo,
              true
            )}
            
            {renderField(
              'Teléfono',
              telefono,
              setTelefono,
              'Ej: 3704598028',
              undefined,
              false,
              'phone-pad'
            )}
            
            {/* Selector de categoría */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Categoría
              </Text>
              <View style={styles.categoriesContainer}>
                {categorias.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      categoria === cat && styles.categoryButtonActive
                    ]}
                    onPress={() => setCategoria(cat)}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      categoria === cat && styles.categoryButtonTextActive
                    ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          
          {/* Dirección */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dirección</Text>
            
            {renderField(
              'Dirección',
              direccion,
              setDireccion,
              'Ej: Calle Principal 123',
              errors.direccion,
              true
            )}
            
            {renderField(
              'Barrio',
              barrio,
              setBarrio,
              'Ej: DIVINO NIÑO',
              undefined,
              false
            )}
            
            <View style={styles.row}>
              <View style={styles.halfField}>
                {renderField(
                  'Manzana',
                  manzana,
                  setManzana,
                  'Ej: MZA 89',
                  undefined,
                  false
                )}
              </View>
              
              <View style={styles.halfField}>
                {renderField(
                  'Casa',
                  casa,
                  setCasa,
                  'Ej: CASA 11',
                  undefined,
                  false
                )}
              </View>
            </View>
            
            {renderField(
              'Ciudad',
              ciudad,
              setCiudad,
              'Ciudad',
              undefined,
              false
            )}
          </View>
          
          {/* Información adicional */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Información Adicional</Text>
            
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Estado</Text>
              <View style={styles.switchContainer}>
                <TouchableOpacity style={styles.activeSwitch}>
                  <Text style={styles.activeSwitchText}>Activo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.inactiveSwitch}>
                  <Text style={styles.inactiveSwitchText}>Inactivo</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {renderField(
              'Saldo inicial',
              '0',
              () => {}, // Solo lectura por ahora
              'Saldo inicial',
              undefined,
              false,
              'numeric'
            )}
          </View>
          
          {/* Botón de guardar */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>💾 Guardar Cliente</Text>
          </TouchableOpacity>
          
          {/* Espacio al final */}
          <View style={styles.bottomSpace} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  scrollContent: {
    padding: 20,
  },
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
  },
  required: {
    color: '#e74c3c',
  },
  errorText: {
    fontSize: 14,
    color: '#e74c3c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#495057',
    backgroundColor: '#f8f9fa',
  },
  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fff5f5',
  },
  inputNumeric: {
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  categoryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6c757d',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ced4da',
    marginTop: 5,
  },
  activeSwitch: {
    flex: 1,
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    alignItems: 'center',
  },
  inactiveSwitch: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeSwitchText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveSwitchText: {
    color: '#6c757d',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 50,
  },
})