import React from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useSession } from './ctx';
import { router } from 'expo-router';

export default function Login () {
  const { signIn } = useSession();

  const handleLogin = () => {
    // Adicione sua lógica de login aqui
    const userData = {
      id: "12345",
      typeAccount: "admin",
      email: "user@example.com",
      nome: "John Doe",
      // Outros dados se necessário
    };

    signIn(userData);
    // Antes de navegar, tenha certeza de que o usuário está autenticado
    router.replace('/');
  };

  const handleRegister = () => {
    // Navegar para a tela de registro
    router.push('/registro');
  };

  return (
    <View className="flex-1 relative">
      <Image
        source={{ uri: 'https://img.freepik.com/fotos-gratis/delicioso-hamburguer-com-ingredientes-frescos_23-2150857908.jpg' }} // Substitua pela imagem de fundo desejada
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
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Senha"
          secureTextEntry
          className="p-4 mb-6 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={handleLogin}
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
        <TouchableOpacity onPress={() => router.push('/forgot-password')} >
          <Text className="text-center text-blue-300">Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
