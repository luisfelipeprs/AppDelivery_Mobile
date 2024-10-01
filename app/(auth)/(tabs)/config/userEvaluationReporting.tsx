import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function userEvaluationReporting () {
  return (
    <View className={"flex-1 bg-white"}>
      <ScrollView className={"p-4"}>

        {/* Título da Tela */}
        <Text className={"text-2xl font-bold mb-6 text-center"}>Avaliação/Denúncia de Usuários</Text>

        {/* Seção de Avaliação */}
        <View className={"mb-8"}>
          <Text className={"text-lg font-semibold mb-4"}>Avalie o Usuário</Text>

          {/* Campo para selecionar o usuário */}
          <View className={"mb-4"}>
            <Text className={"text-base font-bold"}>Usuário</Text>
            <TextInput
              placeholder="Digite o nome ou ID do usuário"
              className={"bg-gray-100 p-3 rounded-lg mt-2"}
            />
          </View>

          {/* Campo para avaliação */}
          <View className={"mb-4"}>
            <Text className={"text-base font-bold"}>Sua Avaliação</Text>
            <TextInput
              placeholder="Escreva sua avaliação"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className={"bg-gray-100 p-3 rounded-lg mt-2 h-32"}
            />
          </View>

          {/* Botão para enviar a avaliação */}
          <TouchableOpacity className={"bg-[#f0b429] p-3 rounded-lg mt-4"}>
            <Text className={"text-white text-center font-semibold"}>Enviar Avaliação</Text>
          </TouchableOpacity>
        </View>

        {/* Seção de Denúncia */}
        <View className={"mb-8"}>
          <Text className={"text-lg font-semibold mb-4"}>Denunciar Usuário</Text>

          {/* Campo para selecionar o usuário */}
          <View className={"mb-4"}>
            <Text className={"text-base font-bold"}>Usuário</Text>
            <TextInput
              placeholder="Digite o nome ou ID do usuário"
              className={"bg-gray-100 p-3 rounded-lg mt-2"}
            />
          </View>

          {/* Campo para motivo da denúncia */}
          <View className={"mb-4"}>
            <Text className={"text-base font-bold"}>Motivo da Denúncia</Text>
            <TextInput
              placeholder="Descreva o motivo da denúncia"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className={"bg-gray-100 p-3 rounded-lg mt-2 h-32"}
            />
          </View>

          {/* Botão para enviar a denúncia */}
          <TouchableOpacity className={"bg-[#f0b429] p-3 rounded-lg mt-4"}>
            <Text className={"text-white text-center font-semibold"}>Enviar Denúncia</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
