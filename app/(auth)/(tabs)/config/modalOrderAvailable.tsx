import { getAddressFromCoordinates } from "@/services/GetAddressFromCoordinates";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useWebSocketTracking } from "@/services/WebSocketTracking"; // Certifique-se de que o caminho esteja correto
import { router } from "expo-router";

// Definindo o tipo das props que o componente irá receber
interface OrderProps {
  order: {
    orderId: string;
    productName: string;
    productDescription: string;
    senderLatitude: number;
    senderLongitude: number;
    recipientLatitude: number;
    recipientLongitude: number;
    paymentMethod: number;
    status: number;
    load: number;
    deliveryType: number;
  };
}

// Função para mapear os valores de `PaymentMethod`
const getPaymentMethodLabel = (paymentMethod: number) => {
  switch (paymentMethod) {
    case 0:
      return "Pix";
    case 1:
      return "Dinheiro";
    case 2:
      return "Débito";
    case 3:
      return "Crédito";
    default:
      return "Desconhecido";
  }
};

// Função para mapear os valores de `OrderStatus`
const getStatusLabel = (status: number) => {
  switch (status) {
    case 0:
      return "Disponível";
    case 1:
      return "Em Progresso";
    case 2:
      return "Cancelado";
    case 3:
      return "Finalizado";
    default:
      return "Desconhecido";
  }
};

// Função para mapear os valores de `Load`
const getLoadLabel = (load: number) => {
  switch (load) {
    case 0:
      return "Leve";
    case 1:
      return "Médio";
    case 2:
      return "Pesado";
    default:
      return "Desconhecido";
  }
};

// Função para mapear os valores de `DeliveryType`
const getDeliveryTypeLabel = (deliveryType: number) => {
  return deliveryType === 0 ? "Carro" : "Moto";
};

export default function CardOrderAvailable({ order }: OrderProps) {
  const [senderAddress, setSenderAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  // Usando o hook de WebSocket
  const {
    connect,
    closeConnection,
    sendMessage,
    connectionStatus,
  } = useWebSocketTracking(
    (data) => {
      // Atualiza os endereços a partir dos dados recebidos
      if (data.senderCoordinates) {
        getAddressFromCoordinates(data.senderCoordinates.latitude, data.senderCoordinates.longitude).then(setSenderAddress);
      }
      if (data.recipientCoordinates) {
        getAddressFromCoordinates(data.recipientCoordinates.latitude, data.recipientCoordinates.longitude).then(setRecipientAddress);
      }
    },
    (error) => console.error('Erro no WebSocket:', error),
    (event) => console.log('Conexão WebSocket fechada:', event.reason)
  );
  const handleAcceptOrder = () => {
    router.push({
      pathname: '/',
      params: { isAcceptedOrder: 'true', orderIdAccepted: order.orderId },
    })
  };

  return (
    <View className={"mb-4 p-4 bg-gray-100 rounded-lg shadow"}>
      <Image
        source={{
          uri: 'https://mercadoeconsumo.com.br/wp-content/uploads/2019/05/100-metros-rasos-do-delivery-a-disputa-por-quem-entrega-mais-r%C3%A1pido-no-varejo.png',
        }}
        className={"w-full h-40 rounded-lg mb-4"}
      />
      <Text className={"text-xl font-semibold mb-2"}>Detalhes do Pedido</Text>

      {/* Informações do Pedido */}
      <Text className={"text-base mb-2"}>Produto: {order.productName}</Text>
      <Text className={"text-base mb-2"}>Descrição: {order.productDescription}</Text>

      {/* Endereços */}
      <Text className={"text-base mb-2"}>Endereço de Envio: {senderAddress}</Text>
      <Text className={"text-base mb-2"}>Endereço de Entrega: {recipientAddress}</Text>

      {/* Informações Adicionais */}
      <Text className={"text-base mb-2"}>Método de Pagamento: {getPaymentMethodLabel(order.paymentMethod)}</Text>
      <Text className={"text-base mb-2"}>Tipo de Entrega: {getDeliveryTypeLabel(order.deliveryType)}</Text>
      <Text className={"text-base mb-2"}>Tipo de Carga: {getLoadLabel(order.load)}</Text>

      {/* Botão de Aceitar Pedido */}
      <TouchableOpacity
        className={"m-4 bg-green-500 rounded-lg py-4"}
        onPress={handleAcceptOrder} // Altera aqui para chamar a nova função
      >
        <Text className={"text-white text-center text-lg font-bold"}>Aceitar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}
