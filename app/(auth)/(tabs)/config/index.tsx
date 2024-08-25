import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSession } from '@/app/ctx';

export default function ConfigScreen () {
  const { signOut } = useSession();

  const handleSignOut = () => {
    signOut();
    router.replace('/');  // Navega para a tela inicial após o logout
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className='my-6 mx-2'>
        {/* Section: Pedidos */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => {/* Navegar para a tela de pedidos */ }}>
          <FontAwesome name="list" size={24} color="#ff0000" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">Ver Pedidos</Text>
        </TouchableOpacity>

        {/* Section: Entregas */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => {/* Navegar para a tela de entregas */ }}>
          <FontAwesome name="truck" size={24} color="#ff0000" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">Ver Entregas</Text>
        </TouchableOpacity>

        {/* Section: Conta */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => {/* Navegar para a tela de conta */ }}>
          <FontAwesome name="user" size={24} color="#ff0000" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">Minha Conta</Text>
        </TouchableOpacity>

        {/* Section: Configurações de Entrega */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => {/* Navegar para a tela de configurações de entrega */ }}>
          <FontAwesome name="cogs" size={24} color="#ff0000" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">Configurações de Entrega</Text>
        </TouchableOpacity>

        {/* Section: Sair */}
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={handleSignOut}>
          <FontAwesome name="sign-out" size={24} color="#ff0000" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
