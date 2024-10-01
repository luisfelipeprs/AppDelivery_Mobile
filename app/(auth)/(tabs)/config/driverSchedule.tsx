import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const mockDrivers = [
  { id: '1', name: 'João Silva', shift: 'morning' },
  { id: '2', name: 'Maria Santos', shift: 'afternoon' },
  { id: '3', name: 'Pedro Oliveira', shift: 'night' },
  { id: '4', name: 'Ana Costa', shift: 'morning' },
  { id: '5', name: 'Carlos Lima', shift: 'afternoon' },
  { id: '6', name: 'Beatriz Souza', shift: 'night' },
  { id: '7', name: 'João Silva', shift: 'morning' },
  { id: '8', name: 'Maria Santos', shift: 'afternoon' },
  { id: '9', name: 'Pedro Oliveira', shift: 'night' },
  { id: '10', name: 'Ana Costa', shift: 'morning' },
  { id: '11', name: 'Carlos Lima', shift: 'afternoon' },
  { id: '12', name: 'Beatriz Souza', shift: 'night' },
  { id: '13', name: 'João Silva', shift: 'morning' },
  { id: '14', name: 'Maria Santos', shift: 'afternoon' },
  { id: '15', name: 'Pedro Oliveira', shift: 'night' },
  { id: '16', name: 'Ana Costa', shift: 'morning' },
  { id: '17', name: 'Carlos Lima', shift: 'afternoon' },
  { id: '18', name: 'Beatriz Souza', shift: 'night' },
  { id: '19', name: 'João Silva', shift: 'morning' },
  { id: '20', name: 'Maria Santos', shift: 'afternoon' },
  { id: '21', name: 'Pedro Oliveira', shift: 'night' },
  { id: '22', name: 'Ana Costa', shift: 'morning' },
  { id: '23', name: 'Carlos Lima', shift: 'afternoon' },
  { id: '24', name: 'Beatriz Souza', shift: 'night' },
  // Adicione mais motoristas conforme necessário
];

export default function DriverSchedule () {
  const [selectedShift, setSelectedShift] = useState('morning');

  const filteredDrivers = mockDrivers.filter(
    (driver) => driver.shift === selectedShift
  );

  const renderDriverItem = ({ item }: any) => (
    <View className="bg-white p-4 mb-4 rounded-lg shadow-lg flex-row items-center">
      <Ionicons name="person-circle" size={40} color="#4B5563" />
      <View className="ml-3">
        <Text className="text-xl font-semibold text-gray-800">{item.name}</Text>
        <Text className="text-lg text-gray-600 mt-1 capitalize">
          Turno: {item.shift}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      {/* Seletor de Turno */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          className={`flex-1 p-3 mr-2 rounded-lg 
            ${selectedShift === 'morning' ? 'bg-[#130a8f]' : 'bg-red-200'}`
          }
          onPress={() => setSelectedShift('morning')}
        >
          <Text className="text-center text-white font-semibold">Manhã</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-3 mr-2 rounded-lg ${selectedShift === 'afternoon' ? 'bg-[#130a8f]' : 'bg-red-200'}`}
          onPress={() => setSelectedShift('afternoon')}
        >
          <Text className="text-center text-white font-semibold">Tarde</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 p-3 rounded-lg ${selectedShift === 'night' ? 'bg-[#130a8f]' : 'bg-red-200'}`}
          onPress={() => setSelectedShift('night')}
        >
          <Text className="text-center text-white font-semibold">Noite</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Motoristas */}
      <FlatList
        data={filteredDrivers}
        renderItem={renderDriverItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}
