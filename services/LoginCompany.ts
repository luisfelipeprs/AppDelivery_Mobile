import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default async function LoginCompany(email: string, password: string) {
  try {
    const dominio = "localhost"
    const porta = "5027"
    
    if (!dominio || !porta) {
      throw new Error('Domínio ou porta não encontrados no AsyncStorage');
    }

    const url = `https://474a-187-108-255-14.ngrok-free.app/company/login`;

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
    console.error('Erro no login:', error);
    throw error;
  }
}