import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import CardOrderAvailable from './modalOrderAvailable';
import OrderAvailable from '@/services/OrderAvailable';
import { Picker } from '@react-native-picker/picker';

export default function OrderAcceptanceScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState<number | null>(null); // null para todos, 0 para moto, 1 para carro

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderAvailable(); // Chamando a função `OrderAvailable` para buscar as ordens disponíveis
        setOrders(response); // Definindo as ordens no estado
        setIsLoading(false); // Desligando o carregamento após a resposta
      } catch (err) {
        setError("Erro ao carregar as ordens");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filtra as ordens de acordo com o tipo de entrega
  const filteredOrders = deliveryTypeFilter === null 
    ? orders 
    : orders.filter(order => order.deliveryType === deliveryTypeFilter);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View className={"flex-1 bg-white"}>
      {/* Filtro para Moto/Carro */}
      <View className={"p-4"}>
        <Picker
          selectedValue={deliveryTypeFilter !== null ? deliveryTypeFilter.toString() : "null"} // Convertendo para string
          onValueChange={(itemValue) => {
            // Corrigindo a lógica para converter o valor corretamente
            setDeliveryTypeFilter(itemValue === "null" ? null : parseInt(itemValue, 10));
          }}
        >
          <Picker.Item label="Todos" value="null" />
          <Picker.Item label="Carro" value={0} />
          <Picker.Item label="Moto" value={1} />
        </Picker>
      </View>

      {/* Listagem dos Pedidos */}
      <ScrollView className={"p-4"}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <CardOrderAvailable key={order.orderId} order={order} />
          ))
        ) : (
          <Text>Sem pedidos disponíveis.</Text>
        )}
      </ScrollView>
    </View>
  );
}
