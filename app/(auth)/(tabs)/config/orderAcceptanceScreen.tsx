import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OrderAcceptanceScreen () {
  return (
    <View className={"flex-1 bg-white"}>

      {/* Detalhes do Pedido */}
      <ScrollView className={"p-4"}>
        <View className={"mb-4 p-4 bg-gray-100 rounded-lg shadow"}>
          <Image
            source={{ uri: 'https://mercadoeconsumo.com.br/wp-content/uploads/2019/05/100-metros-rasos-do-delivery-a-disputa-por-quem-entrega-mais-r%C3%A1pido-no-varejo.png' }} // Imagem de exemplo
            className={"w-full h-40 rounded-lg mb-4"}
          />
          <Text className={"text-xl font-semibold mb-2"}>Detalhes do Pedido</Text>

          {/* Informações do Cliente */}
          <Text className={"text-base mb-2"}>Cliente: João Silva</Text>
          <Text className={"text-base mb-2"}>Endereço: Rua das Flores, 123 - Centro</Text>
          <Text className={"text-base mb-2"}>Telefone: (11) 98765-4321</Text>

          {/* Informações Adicionais */}
          <Text className={"text-base mb-2"}>Observações do Cliente: Sem cebola</Text>
          <Text className={"text-base mb-2"}>Horário Estimado: 30-40 minutos</Text>

          {/* Itens do Pedido */}
          <Text className={"text-lg font-semibold mb-2"}>Itens do Pedido:</Text>
          <View className={"mb-4"}>
            <View className={"flex-row justify-between mb-2"}>
              <Text className={"text-base"}>1x Pizza Margherita</Text>
              <Text className={"text-base"}>R$ 30,00</Text>
            </View>
            <View className={"flex-row justify-between mb-2"}>
              <Text className={"text-base"}>2x Refrigerante</Text>
              <Text className={"text-base"}>R$ 15,00</Text>
            </View>
            <View className={"flex-row justify-between mb-2 border-t border-gray-300 pt-2"}>
              <Text className={"text-lg font-semibold"}>Subtotal</Text>
              <Text className={"text-lg font-semibold"}>R$ 45,00</Text>
            </View>
            <View className={"flex-row justify-between mb-2"}>
              <Text className={"text-base"}>Taxa de Entrega</Text>
              <Text className={"text-base"}>R$ 5,00</Text>
            </View>
            <View className={"flex-row justify-between mb-2 border-t border-gray-300 pt-2"}>
              <Text className={"text-lg font-semibold"}>Total</Text>
              <Text className={"text-lg font-semibold"}>R$ 50,00</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botão de Aceitar Pedido */}
      <TouchableOpacity
        className={"m-4 bg-green-500 rounded-lg py-4"}
        onPress={() => alert('Pedido Aceito')}
      >
        <Text className={"text-white text-center text-lg font-bold"}>Aceitar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};
