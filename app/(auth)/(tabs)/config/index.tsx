import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSession } from '@/app/ctx';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfigScreen () {
  const { signOut } = useSession();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('password');
    signOut();
    router.replace('/');  // Navega para a tela inicial após o logout
  };


  const { userAccount } = useSession()

  let accountType = userAccount?.typeAccount!
  console.log("accountType > ", accountType);


  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className='my-6 mx-2'>
        {/* Section: Pedidos */}
        {(accountType == 'Consumer' || accountType == 'Company') && (
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => { router.push('config/avaluationPage') }}>
            <FontAwesome name="list" size={24} color="#130a8f" />
            <Text className="ml-3 text-lg font-semibold text-gray-800">Avaliar - motoqueiro (cliente|empresa)</Text>
          </TouchableOpacity>
        )}

        {/* Section: Entregas
        {(accountType == 'guest') && (
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={handleSignOut}>
            <FontAwesome name="user" size={24} color="#130a8f" />
            <Text className="ml-3 text-lg font-semibold text-gray-800">Entrar</Text>
          </TouchableOpacity>
        )} */}

        {/* Section: Configurações de Entrega */}
        {(accountType == 'Driver') && (
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => { router.push('config/orderAcceptanceScreen') }}>
            <FontAwesome name="ticket" size={24} color="#130a8f" />
            <Text className="ml-3 text-lg font-semibold text-gray-800">Pedidos disponíveis (motoqueiro)</Text>
          </TouchableOpacity>
        )}

        {/* Section: Configurações de Entrega */}
        {(accountType == 'Consumer' || accountType == 'Company') && (
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => { router.push('config/deliveryHistory') }}>
            <FontAwesome name="list-ol" size={24} color="#130a8f" />
            <Text className="ml-3 text-lg font-semibold text-gray-800">Histórico de pedidos (cliente|empresa)</Text>
          </TouchableOpacity>
        )}

        {/* Section: Configurações de Entrega */}
        {(accountType == 'Driver' || accountType == 'Company') && (
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => { router.push('config/supportScreen') }}>
            <FontAwesome name="warning" size={24} color="#130a8f" />
            <Text className="ml-3 text-lg font-semibold text-gray-800">Denuncia (empresa|motorista)</Text>
          </TouchableOpacity>
        )}

        {/* Section: Configurações de Entrega */}
        {(accountType) && (
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => { router.push('config/languageSelectionScreen') }}>
            <FontAwesome name="language" size={24} color="#130a8f" />
            <Text className="ml-3 text-lg font-semibold text-gray-800">Idiomas</Text>
          </TouchableOpacity>
        )}

        {/* Section: Configurações de Entrega */}
        {/* <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => { router.push('config/accountSettingsScreen') }}>
          <FontAwesome name="user" size={24} color="#130a8f" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">Dados da conta</Text>
        </TouchableOpacity> */}

        {/* Section: Configurações de Entrega */}
        {(accountType == 'Company') && (
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => { router.push('config/driverSchedule') }}>
            <FontAwesome name="cogs" size={24} color="#130a8f" />
            <Text className="ml-3 text-lg font-semibold text-gray-800">Turnos de trabalho (empresa)</Text>
          </TouchableOpacity>
        )}

        {/* Section: Configurações de Entrega */}
        {/* <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={() => { router.push('config/mapsLocation') }}>
          <FontAwesome name="map-signs" size={24} color="#130a8f" />
          <Text className="ml-3 text-lg font-semibold text-gray-800">maps</Text>
        </TouchableOpacity> */}

        {/* Section: Sair */}
        {(accountType != 'Guest') && (
          <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-lg shadow-md mb-3" onPress={handleSignOut}>
            <FontAwesome name="sign-out" size={24} color="#130a8f" />
            <Text className="ml-3 text-lg font-semibold text-gray-800">Sair</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
