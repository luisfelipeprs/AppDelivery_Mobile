import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default async function OrderAvailable() {
  try {
    const dominio = await AsyncStorage.getItem("domain");
    
    if (!dominio) {
      throw new Error('Domínio ou porta não encontrados no AsyncStorage');
    }

    const url = `${dominio}/order/order-available`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar ordens disponíveis:', error);
    throw error;
  }
}