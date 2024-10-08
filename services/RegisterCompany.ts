import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface CompanyData {
  cnpj: string;
  name: string;
  email: string;
  password: string;
  cep: string;
  street: string;
  numberLocation: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  phone: string;
  typeCompany: string;
}


export default async function RegisterCompany(companyData: CompanyData) {
  try {
    console.log(companyData);
    
    const dominio = await AsyncStorage.getItem("domain");
    
    if (!dominio) {
      throw new Error('Domínio ou porta não encontrados no AsyncStorage');
    }

    const url = `${dominio}/company/`;
    console.log(url);
    
    // Enviar todos os dados da empresa
    const response = await axios.post(url, companyData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao registrar empresa:', error);
    throw error;
  }
}
