import { useState } from "react";
import { router, useLocalSearchParams } from 'expo-router';
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import ConfirmResetPassword from "@/services/ConfirmResetPassword";
export default function ConfirmResetPasswordForm() {
  const { email } = useLocalSearchParams();
  const emailString = typeof email === 'string' ? email : '';
  const [confirmResetPasswordData, setConfirmResetPasswordData] = useState({
    email: '',
    token: '',
    newPassword: ''
  });
  const handleInputChange = (field: string, value: string) => {
    setConfirmResetPasswordData({ ...confirmResetPasswordData, [field]: value });
  };
  const handleConfirmResetPassword = async() => {
    const dataConfirmResetPassword = {
      email: emailString,
      token: confirmResetPasswordData.token,
      newPassword: confirmResetPasswordData.newPassword
    };
    console.log("dataResetPassword > ", dataConfirmResetPassword);

    await ConfirmResetPassword(dataConfirmResetPassword);
    console.log("Senha alterada com sucesso.");
    router.push('/login');
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
          placeholder="Token"
          value={confirmResetPasswordData.token}
          onChangeText={(text) => handleInputChange('token', text)}
          className="p-4 mb-6 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Nova Senha"
          value={confirmResetPasswordData.newPassword}
          onChangeText={(text) => handleInputChange('newPassword', text)}
          className="p-4 mb-6 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          onPress={handleConfirmResetPassword}
          className="bg-blue-500 p-4 rounded mb-6 shadow-lg"
        >
          <Text className="text-white text-center text-lg">Redefinir Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}