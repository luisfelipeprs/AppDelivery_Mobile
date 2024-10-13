import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // para os campos de seleção
import { CreateOrder } from '@/services/CreateOrder';

interface ModalProps {
  senderLatitude: number;
  senderLongitude: number;
  stopLatitude?: number;
  stopLongitude?: number;
  recipientLatitude?: number;
  recipientLongitude?: number;
  status: "Available";
  deliveryId: null;
  consumerId: string | null;
  companyId: string | null;
  visible: boolean;
  handleSubmitModal: (idOrder: string ) => void;
  onClose: () => void;
}

type PaymentMethod = "Pix" | "Money" | "Debit" | "Credit";

interface FormDataType {
  productName: string;
  productDescription: string;
  paymentMethod: PaymentMethod;
  deliveryType: "Car" | "Motorcycle";
  load: "Light" | "Medium" | "Heavy";
  senderLatitude: number;
  senderLongitude: number;
  stopLatitude?: number;
  stopLongitude?: number;
  recipientLatitude: number;
  recipientLongitude: number;
  deliveryId: null;
  status: "Available";
  consumerId: string | null;
  companyId: string | null;
}

const ModalOrder: React.FC<ModalProps> = ({
  visible, 
  onClose,
  handleSubmitModal,  
  senderLatitude, 
  senderLongitude, 
  stopLatitude, 
  stopLongitude, 
  recipientLatitude, 
  recipientLongitude,
  status,
  deliveryId,
  consumerId,
  companyId

}) => {
  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Money");
  const [deliveryType, setDeliveryType] = useState<"Car" | "Motorcycle">('Car');
  const [load, setLoad] = useState<"Light" | "Medium" | "Heavy">('Light');

  const handleSubmit = async () => {
    if (recipientLatitude === undefined || recipientLongitude === undefined) {
      Alert.alert("Erro", "As coordenadas do destinatário são obrigatórias.");
      return;
    }
    const formData: FormDataType = {
      productName,
      productDescription,
      paymentMethod,
      deliveryType,
      load,
      senderLatitude,
      senderLongitude,
      stopLatitude,
      stopLongitude,
      recipientLatitude,
      recipientLongitude,
      status,
      deliveryId,
      consumerId,
      companyId
    };
    
    try {
      const response = await CreateOrder(formData);
      console.log("Pedido criado!", "Seu pedido foi criado com sucesso.");
      onClose(); // Fecha o modal após o envio
      if (handleSubmitModal) {
        console.log('Chamando handleSubmitModal com ID:', response.orderId);
        handleSubmitModal(response.orderId);  // Verifica se o ID é passado corretamente
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Houve um problema ao criar o pedido. Tente novamente.");
    }
  };

  const handleModalClose = () => {
    onClose();
  }

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <TouchableOpacity className='flex-1 justify-center items-center bg-[#00000081] bg-opacity-50' onPress={handleModalClose}>
        <View className='bg-white p-6 rounded-lg w-11/12'>
          <Text className='text-lg font-bold mb-4'>Informações do pedido</Text>

          {/* Product Name */}
          <TextInput
            className='border p-2 mb-4 rounded'
            placeholder="Nome do Produto"
            value={productName}
            onChangeText={setProductName}
          />

          {/* Product Description */}
          <TextInput
            className='border p-2 mb-4 rounded'
            placeholder="Descrição do Produto"
            value={productDescription}
            onChangeText={setProductDescription}
          />

          {/* Payment Method */}
          <Text className='mb-2'>Método de pagamento</Text>
          <View className='border mb-4 rounded'>
            <Picker
              selectedValue={paymentMethod}
              onValueChange={(itemValue) => setPaymentMethod(itemValue as PaymentMethod)} // Casting para o tipo correto
            >
              <Picker.Item label="Pix" value="Pix" />
              <Picker.Item label="Dinheiro" value="Money" />
              <Picker.Item label="Débito" value="Debit" />
              <Picker.Item label="Crédito" value="Credit" />
            </Picker>
          </View>

          {/* Delivery Type */}
          <Text className='mb-2'>Tipo do Entregador</Text>
          <View className='border mb-4 rounded'>
            <Picker
              selectedValue={deliveryType}
              onValueChange={(itemValue) => setDeliveryType(itemValue)}
            >
              <Picker.Item label="Carro" value="Car" />
              <Picker.Item label="Moto" value="Motorcycle" />
            </Picker>
          </View>

          {/* Load */}
          <Text className='mb-2'>Carga</Text>
          <View className='border mb-4 rounded'>
            <Picker
              selectedValue={load}
              onValueChange={(itemValue) => setLoad(itemValue)}
            >
              <Picker.Item label="Leve" value="Light" />
              <Picker.Item label="Normal" value="Medium" />
              <Picker.Item label="Pesada" value="Heavy" />
            </Picker>
          </View>

          {/* Submit Button */}
          <TouchableOpacity className='bg-blue-500 p-3 rounded-lg mb-2' onPress={handleSubmit}>
            <Text className='text-white text-center'>Criar Pedido</Text>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity className='bg-red-500 p-3 rounded-lg mb-2' onPress={onClose}>
            <Text className='text-white text-center'>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalOrder;
