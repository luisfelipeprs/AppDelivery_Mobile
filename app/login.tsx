import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import { useSession } from './ctx';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginCompany from '../services/LoginCompany'; // Importando a função de login

export default function Login() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Quando o componente é montado, verifica se há credenciais salvas
    checkLogin();
  }, []);
  
  const checkLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
  
      if (storedEmail && storedPassword) {
        // Tenta realizar o login com as credenciais salvas
        handleLogin(storedEmail, storedPassword);
      }
    } catch (e) {
      console.error('Erro ao carregar dados do AsyncStorage:', e);
    }
  };
  

  // Função de login
  const handleLogin = async (inputEmail: string, inputPassword: string) => {
    const emailToUse = inputEmail || email;
    const passwordToUse = inputPassword || password;

    try {
      // Chama a função de login e obtém os dados do usuário
      const response = await loginCompany(emailToUse, passwordToUse);
      const userData = {
        id: response.id,
        typeAccount: response.role,
        email: response.email,
        nome: response.name,
      };

      // Salva os dados do usuário e faz login
      signIn(userData);

      // Salva as credenciais no AsyncStorage
      await AsyncStorage.setItem('email', emailToUse);
      await AsyncStorage.setItem('password', passwordToUse);

      // Navega para a página inicial
      router.replace('/');
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Falha ao realizar login. Verifique suas credenciais.');
    }
  };

  // Função de registrar (apenas para navegação)
  const handleRegister = () => {
    router.push('/registro');
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
          onPress={() => handleLogin(email, password)} // Passando os valores de email e senha
          className="bg-[#130a8f] p-4 rounded mb-4 shadow-lg"
        >
          <Text className="text-white text-center text-lg">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRegister}
          className="bg-blue-500 p-4 rounded mb-6 shadow-lg"
        >
          <Text className="text-white text-center text-lg">Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text className="text-center text-blue-300">Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
