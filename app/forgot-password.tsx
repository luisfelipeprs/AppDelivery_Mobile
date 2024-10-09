import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { router } from 'expo-router';
import ResetPassword from '@/services/ResetPassword';
import { useSession } from './ctx';

export default function ForgotPassword() {
  const [resetPasswordData, setResetPasswordData] = useState({
    email: '',
    typeEntity: 'Consumer' as 'Consumer' | 'Company' | 'Driver',
  });

  const { userAccount } = useSession();

  const handleResetPassword = async () => {
    const dataResetPassword = {
      email: resetPasswordData.email,
      typeEntity: resetPasswordData.typeEntity,
    };
    console.log("dataResetPassword > ", dataResetPassword);

    await ResetPassword(dataResetPassword);
    console.log("Email de redefinição enviado.");
    router.push('/confirm-reset-password');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleInputChange = (field: string, value: string) => {
    setResetPasswordData({ ...resetPasswordData, [field]: value });
  };

  return (
    <View className="flex-1 relative">
      <Image
        source={{ uri: 'https://img.freepik.com/fotos-gratis/delicioso-hamburguer-com-ingredientes-frescos_23-2150857908.jpg' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <View className="flex-1 justify-center p-6 bg-black/50 backdrop-blur-md">
        <View className="mb-8 items-center">
          <Text className="text-6xl font-extrabold text-white mt-4 tracking-wide">
            Delivery<Text className="text-[#130a8f]">Já</Text>
          </Text>
        </View>
        <TextInput
          placeholder="E-mail"
          value={resetPasswordData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          className="p-4 mb-6 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />
        <View className="mb-4">
          <Text className="text-white mb-2 font-bold">Tipo de Usuário:</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => handleInputChange('typeEntity', 'Company')}
              className={`p-4 mb-2 border border-gray-300 rounded-full flex-1 mx-1 ${resetPasswordData.typeEntity === 'Company' ? 'bg-blue-500' : 'bg-white/90'}`}
            >
              <Text className={`text-center ${resetPasswordData.typeEntity === 'Company' ? 'text-white' : 'text-black'}`}>Empresa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleInputChange('typeEntity', 'Consumer')}
              className={`p-4 mb-2 border border-gray-300 rounded-full flex-1 mx-1 ${resetPasswordData.typeEntity === 'Consumer' ? 'bg-blue-500' : 'bg-white/90'}`}
            >
              <Text className={`text-center ${resetPasswordData.typeEntity === 'Consumer' ? 'text-white' : 'text-black'}`}>Consumidor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleInputChange('typeEntity', 'Driver')}
              className={`p-4 mb-2 border border-gray-300 rounded-full flex-1 mx-1 ${resetPasswordData.typeEntity === 'Driver' ? 'bg-blue-500' : 'bg-white/90'}`}
            >
              <Text className={`text-center ${resetPasswordData.typeEntity === 'Driver' ? 'text-white' : 'text-black'}`}>Entregador</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleResetPassword}
          className="bg-blue-500 p-4 rounded mb-6 shadow-lg"
        >
          <Text className="text-white text-center text-lg">Redefinir Senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text className="text-center text-white">
            Lembrou a senha? <Text className="text-blue-300">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
