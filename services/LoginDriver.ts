import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default async function loginDriver(email: string, password: string) {
  try {
    const dominio = await AsyncStorage.getItem("domain")
    
    if (!dominio) {
      throw new Error('Domínio ou porta não encontrados no AsyncStorage');
    }

    const url = `${dominio}/driver/login`;

    const data = {
      email,
      password,
    };
      
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return response.data;
  } catch (error) {
    console.error('Erro no login do motorista:', error);
    throw error;
  }
}