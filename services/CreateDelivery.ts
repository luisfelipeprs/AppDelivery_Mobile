import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export type StatusDelivery = 'NotStarted' | 'InTransit' | 'Delivered' | 'Failed'

export interface CreateDeliveryProps {
  status: StatusDelivery;
  orderId: string;
  deliveryPersonId: string;
}

export default async function CreateDelivery(deliveryData: CreateDeliveryProps) {
  try {
    const dominio = await AsyncStorage.getItem("domain");
    
    if (!dominio) {
      throw new Error('Domínio ou porta não encontrados no AsyncStorage');
    }

    const url = `${dominio}/delivery/`;

    const response = await axios.post(url, deliveryData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao registrar entrega:', error);
    throw error;
  }
}