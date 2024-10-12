import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type PaymentMethod = "Pix" | "Money" | "Debit" | "Credit";

interface DataOrderProps {
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

export async function CreateOrder(dataOrder: DataOrderProps) {
  try {
    const dominio = await AsyncStorage.getItem("domain");

    if (!dominio) {
      throw new Error('Domínio ou porta não encontrados no AsyncStorage');
    }
    

    const url = `${dominio}/order/`;
    
    const response = await axios.post(url, dataOrder, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || 'Erro desconhecido durante a criação do pedido.'
      : 'Erro inesperado ao registrar um pedido.';
    
    console.error('Erro ao registrar um pedido:', errorMessage);
    throw new Error(errorMessage); 
  }
}