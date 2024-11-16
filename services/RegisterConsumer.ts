import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface ConsumerData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  dateOfBirth: string;
}

export default async function RegisterConsumer(consumerData: ConsumerData) {
  try {
    console.log("consumer ?", consumerData);
    
    const dominio = await AsyncStorage.getItem("domain");
    
    if (!dominio) {
      throw new Error('Domínio ou porta não encontrados no AsyncStorage');
    }

    const url = `${dominio}/consumer/`;
    console.log(url);
    

    const response = await axios.post(url, consumerData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro no registro do consumidor:', error);
    throw error;
  }
}