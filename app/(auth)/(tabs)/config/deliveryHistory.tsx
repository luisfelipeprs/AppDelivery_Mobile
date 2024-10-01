import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';

export default function DeliveryHistoryScreen () {
  const deliveries = [
    {
      id: 1,
      date: '25/08/2024',
      time: '12:30',
      customerName: 'Maria Oliveira',
      address: 'Av. Paulista, 1000 - São Paulo, SP',
      status: 'Entregue',
      items: [
        { name: 'Pizza Margherita', quantity: 1, price: 'R$ 30,00' },
        { name: 'Refrigerante', quantity: 2, price: 'R$ 15,00' }
      ],
      total: 'R$ 45,00',
      paymentMethod: 'Cartão de Crédito'
    },
    {
      id: 2,
      date: '24/08/2024',
      time: '19:45',
      customerName: 'João Silva',
      address: 'Rua das Flores, 200 - Rio de Janeiro, RJ',
      status: 'Entregue',
      items: [
        { name: 'Hambúrguer', quantity: 2, price: 'R$ 50,00' },
        { name: 'Batata Frita', quantity: 1, price: 'R$ 10,00' }
      ],
      total: 'R$ 60,00',
      paymentMethod: 'Dinheiro'
    },
    {
      id: 3,
      date: '23/08/2024',
      time: '14:20',
      customerName: 'Ana Souza',
      address: 'Rua dos Andradas, 300 - Porto Alegre, RS',
      status: 'Cancelada',
      items: [
        { name: 'Salada Caesar', quantity: 1, price: 'R$ 25,00' }
      ],
      total: 'R$ 25,00',
      paymentMethod: 'Cartão de Débito'
    },
    {
      id: 4,
      date: '22/08/2024',
      time: '10:15',
      customerName: 'Carlos Lima',
      address: 'Av. Brasil, 1500 - Belo Horizonte, MG',
      status: 'Entregue',
      items: [
        { name: 'Café Expresso', quantity: 2, price: 'R$ 10,00' },
        { name: 'Croissant', quantity: 1, price: 'R$ 7,00' }
      ],
      total: 'R$ 17,00',
      paymentMethod: 'PIX'
    }
  ];

  return (
    <View className={"flex-1 bg-white"}>

      {/* Lista de Entregas */}
      <ScrollView className={"p-4 my-5"}>
        {deliveries.map(delivery => (
          <View key={delivery.id} className={"mb-7 p-4 bg-gray-100 rounded-lg shadow"}>
            <View className={"flex-row justify-between mb-2"}>
              <Text className={"text-lg font-semibold"}>{delivery.date} - {delivery.time}</Text>
              <Text className={`text-lg font-semibold ${delivery.status === 'Entregue' ? 'text-green-500' : 'text-[#130a8f]'}`}>{delivery.status}</Text>
            </View>
            <Text className={"text-base mb-2"}>Cliente: {delivery.customerName}</Text>
            <Text className={"text-base mb-2"}>Endereço: {delivery.address}</Text>

            {/* Detalhes da Entrega */}
            <TouchableOpacity className={"bg-blue-100 rounded-lg p-2 mt-2"} onPress={() => alert('Mostrar detalhes')}>
              <Text className={"text-blue-600 font-semibold"}>Ver Detalhes</Text>
            </TouchableOpacity>

            <View className={"mt-2"}>
              {delivery.items.map((item, index) => (
                <View key={index} className={"flex-row justify-between mb-1"}>
                  <Text className={"text-base"}>{item.quantity}x {item.name}</Text>
                  <Text className={"text-base"}>{item.price}</Text>
                </View>
              ))}
              <View className={"flex-row justify-between mt-2 border-t border-gray-300 pt-2"}>
                <Text className={"text-lg font-semibold"}>Total</Text>
                <Text className={"text-lg font-semibold"}>{delivery.total}</Text>
              </View>
              <Text className={"text-base mt-2"}>Método de Pagamento: {delivery.paymentMethod}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

    </View>
  );
};
