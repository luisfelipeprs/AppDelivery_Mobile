import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default async function loginConsumer(email: string, password: string) {
  try {
     const dominio = await AsyncStorage.getItem("domain")
    // const porta = "5027"
    
     if (!dominio) {
       throw new Error('Domínio não encontrado no AsyncStorage');
     }

    const url = `${dominio}/consumer/login`;
     console.log("url > ", url);
     
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
    // Trata erros da requisição
    console.error('Erro no login de consumer:', error);
    throw error;
  }
}