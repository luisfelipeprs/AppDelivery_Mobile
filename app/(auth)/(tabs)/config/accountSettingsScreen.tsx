import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';

export default function AccountSettingsScreen () {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  return (
    <View className={"flex-1 bg-white py-4"}>

      {/* Configurações da Conta */}
      <ScrollView className={"flex-1 p-4"}>

        {/* Seção de Informações Pessoais */}
        <View className={"mb-6"}>
          <Text className={"text-lg font-semibold mb-4"}>Informações Pessoais</Text>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Nome Completo</Text>
            <Text className={"text-base text-gray-600 mt-1"}>Maria Oliveira</Text>
          </TouchableOpacity>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>E-mail</Text>
            <Text className={"text-base text-gray-600 mt-1"}>maria.oliveira@email.com</Text>
          </TouchableOpacity>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Número de Telefone</Text>
            <Text className={"text-base text-gray-600 mt-1"}>+55 11 99999-9999</Text>
          </TouchableOpacity>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Endereço</Text>
            <Text className={"text-base text-gray-600 mt-1"}>Av. Paulista, 1000 - São Paulo, SP</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Notificações */}
        <View className={"mb-6"}>
          <Text className={"text-lg font-semibold mb-4"}>Notificações</Text>

          <View className={"bg-gray-100 p-4 mb-2 rounded-lg flex-row justify-between items-center"}>
            <Text className={"text-lg text-black"}>Receber Notificações</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#f04f5b" }}
              thumbColor={isNotificationsEnabled ? "#f04f5b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
            />
          </View>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Notificações de Ofertas</Text>
          </TouchableOpacity>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Notificações de Atualizações</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Segurança */}
        <View className={"mb-6"}>
          <Text className={"text-lg font-semibold mb-4"}>Segurança</Text>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Alterar Senha</Text>
          </TouchableOpacity>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Autenticação em Duas Etapas</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Idioma */}
        {/* <View className={"mb-6"}>
          <Text className={"text-lg font-semibold mb-4"}>Idioma</Text>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Português</Text>
          </TouchableOpacity>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>English</Text>
          </TouchableOpacity>

          <TouchableOpacity className={"bg-gray-100 p-4 mb-2 rounded-lg"}>
            <Text className={"text-lg text-black"}>Español</Text>
          </TouchableOpacity>
        </View> */}

        {/* Botão de Sair */}
        <View className={"mb-6"}>
          <TouchableOpacity className={"bg-[#130a8f] p-4 rounded-lg"}>
            <Text className={"text-center text-white text-lg font-semibold"}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
