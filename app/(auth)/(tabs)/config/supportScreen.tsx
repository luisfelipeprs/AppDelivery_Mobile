import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function ReportUserScreen () {
  return (
    <View className={"flex-1 bg-white"}>

      <ScrollView className={"flex-1 p-4"}>

        {/* Campo de Nome ou ID do Usuário */}
        <View className={"mb-4"}>
          <Text className={"text-base font-bold"}>Usuário</Text>
          <TextInput
            placeholder="Digite o nome ou ID do usuário"
            className={"bg-gray-100 p-3 rounded-lg mt-2"}
          />
        </View>

        {/* Campo de Motivo da Denúncia */}
        <View className={"mb-4"}>
          <Text className={"text-base font-bold"}>Motivo da Denúncia</Text>
          <TextInput
            placeholder="Descreva o motivo da denúncia"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            className={"bg-gray-100 p-3 rounded-lg mt-2 h-40"} // Ajuste de altura para parecer um textarea
          />
        </View>

        {/* Campo de Evidências (opcional) */}
        <View className={"mb-4"}>
          <Text className={"text-base font-bold"}>Evidências (opcional)</Text>
          <TextInput
            placeholder="Adicione links ou descrições adicionais"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className={"bg-gray-100 p-3 rounded-lg mt-2 h-32"}
          />
        </View>

        {/* Botão para Enviar Denúncia */}
        <TouchableOpacity className={"bg-[#f0b429] p-4 rounded-lg"}>
          <Text className={"text-center text-white text-lg font-semibold"}>Enviar Denúncia</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
