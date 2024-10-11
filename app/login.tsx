import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { useSession } from './ctx';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginDriver from '@/services/LoginDriver';
import LoginCompany from '@/services/LoginCompany';
import loginConsumer from '@/services/LoginConsumer';

export default function Login() {
  const { signIn, signInAsGuest } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'Company' | 'Consumer' | 'Driver'>('Consumer');

  useEffect(() => {
    AsyncStorage.setItem('domain', "https://d3de-187-108-255-14.ngrok-free.app"); // domínio do backend
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');

      if (storedEmail && storedPassword) {
        handleLogin(storedEmail, storedPassword);
      }
    } catch (e) {
      console.error('Erro ao carregar dados do AsyncStorage:', e);
    }
  };

  const handleLogin = async (inputEmail: string, inputPassword: string) => {
    const emailToUse = inputEmail || email;
    const passwordToUse = inputPassword || password;

    try {
      let response;

      if (userType === 'Company') {
        response = await LoginCompany(emailToUse, passwordToUse);
      } else if (userType === 'Driver') {
        response = await loginDriver(emailToUse, passwordToUse);
      } else {
        response = await loginConsumer(emailToUse, passwordToUse);
      }

      const userData = {
        id: response.id,
        typeAccount: response.role,
        email: response.email,
        nome: response.name,
      };

      signIn(userData);
      await AsyncStorage.setItem('email', emailToUse);
      await AsyncStorage.setItem('password', passwordToUse);
      router.replace('/');
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Falha ao realizar login. Verifique suas credenciais.');
    }
  };

  const handleRegister = () => {
    router.push('/register-driver');
  };

  const handleUserTypeChange = (type: 'Company' | 'Consumer' | 'Driver') => {
    setUserType(type);
  };

  // Modo Guest (Entrar como convidado) possui restriçoes de usabilidade
  const handleGuestLogin = () => {
    signInAsGuest();
    router.replace('/');
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

        <View className="mb-4">
          <Text className="text-white mb-2 font-bold">Tipo de Usuário:</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => handleUserTypeChange('Company')}
              className={`p-4 mb-2 border border-gray-300 rounded-full flex-1 mx-1 ${userType === 'Company' ? 'bg-blue-500' : 'bg-white/90'}`}
            >
              <Text className={`text-center ${userType === 'Company' ? 'text-white' : 'text-black'}`}>Empresa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleUserTypeChange('Consumer')}
              className={`p-4 mb-2 border border-gray-300 rounded-full flex-1 mx-1 ${userType === 'Consumer' ? 'bg-blue-500' : 'bg-white/90'}`}
            >
              <Text className={`text-center ${userType === 'Consumer' ? 'text-white' : 'text-black'}`}>Consumidor</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleUserTypeChange('Driver')}
              className={`p-4 mb-2 border border-gray-300 rounded-full flex-1 mx-1 ${userType === 'Driver' ? 'bg-blue-500' : 'bg-white/90'}`}
            >
              <Text className={`text-center ${userType === 'Driver' ? 'text-white' : 'text-black'}`}>Entregador</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="p-4 mb-6 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={() => handleLogin(email, password)}
          className="p-4 bg-[#130a8f] rounded-full"
        >
          <Text className="text-center text-white font-bold">Entrar</Text>
        </TouchableOpacity>


        <TouchableOpacity
          onPress={handleRegister}
          className="p-4 bg-blue-500 rounded-full mt-4"
        >
          <Text className="text-center text-white font-bold">Registrar-se</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleGuestLogin}
          className="p-4 bg-gray-600 rounded-full mt-4"
        >
          <Text className="text-center text-white font-bold">Entrar como Convidado</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}