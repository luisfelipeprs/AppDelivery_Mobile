import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import RegisterDriver from '@/services/RegisterDriver'; // Importa o serviço de registro
import { useSession } from './ctx'; // Importa o contexto de sessão

export default function RegisterDriverForm() {
  const [driverData, setDriverData] = useState({
    name: '',
    email: '',
    password: '',
    cnh: '',
    vehicle: '',
    documentationVehicle: '',
    typeDriver: 'Car' as 'Car' | 'Motorcycle',
  });

  const { signIn } = useSession();

  const handleInputChange = (field: string, value: string) => {
    setDriverData({ ...driverData, [field]: value });
  };

  const handleSubmit = async () => {
    const dataToSend = {
      name: driverData.name,
      email: driverData.email,
      password: driverData.password,
      cnh: driverData.cnh,
      vehicle: driverData.vehicle,
      documentationVehicle: driverData.documentationVehicle,
      typeDriver: driverData.typeDriver,
      companyId: null,
      active: true,
      createdOn: new Date().toISOString(),
    };

    try {
      console.log("data > ", dataToSend);

      const response = await RegisterDriver(dataToSend);

      console.log('Motorista registrado com sucesso:', response);
      signIn(response);
      router.replace("/");
    } catch (error) {
      console.error('Erro ao registrar motorista:', error);
      Alert.alert('Erro', 'Erro ao registrar motorista. Tente novamente.');
    }
  };

  return (
    <View className="flex-1 relative">
      <Image
        source={{ uri: 'https://img.freepik.com/fotos-gratis/delicioso-hamburguer-com-ingredientes-frescos_23-2150857908.jpg' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <View className="flex-1 justify-center p-6 bg-black/50 backdrop-blur-md">
        <View className="mb-8 items-center">
          <Text className="text-6xl font-extrabold text-white mt-32 tracking-wide">
            Delivery<Text className="text-[#130a8f]">Já</Text>
          </Text>
        </View>

        <TextInput
          placeholder="Nome Completo"
          value={driverData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="E-mail"
          value={driverData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Senha"
          value={driverData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="CNH"
          value={driverData.cnh}
          onChangeText={(text) => handleInputChange('cnh', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Veículo"
          value={driverData.vehicle}
          onChangeText={(text) => handleInputChange('vehicle', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Documentação do Veículo"
          value={driverData.documentationVehicle}
          onChangeText={(text) => handleInputChange('documentationVehicle', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <View className="mb-4">
          <Text className="text-white mb-2 font-bold">Tipo de Motorista:</Text>
          <TouchableOpacity
            onPress={() => handleInputChange('typeDriver', 'Car')}
            className={`p-4 mb-2 border border-gray-300 rounded ${driverData.typeDriver === 'Car' ? 'bg-blue-500' : 'bg-white/90'}`}
          >
            <Text className="text-center">Carro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInputChange('typeDriver', 'Motorcycle')}
            className={`p-4 border border-gray-300 rounded ${driverData.typeDriver === 'Motorcycle' ? 'bg-blue-500' : 'bg-white/90'}`}
          >
            <Text className="text-center">Moto</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-500 p-4 rounded mb-16 shadow-lg"
        >
          <Text className="text-white text-center text-lg">Registrar Motorista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}