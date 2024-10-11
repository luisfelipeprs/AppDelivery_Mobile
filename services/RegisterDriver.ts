import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface DriverData {
  name: string;
  email: string;
  password: string;
  cnh: string;
  vehicle: string;
  documentationVehicle: string;
  typeDriver: 'Car' | 'Motorcycle';
  companyId: string | null;
  active: boolean;
  createdOn: string;
}

export default async function RegisterDriver(driverData: DriverData) {
  try {
    console.log("driverData ?", driverData);
    
    const dominio = await AsyncStorage.getItem("domain");
    
    if (!dominio) {
      throw new Error('Domínio ou porta não encontrados no AsyncStorage');
    }

    const url = `${dominio}/driver/`;
    console.log(url);
    

    const response = await axios.post(url, driverData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro no registro do entregador:', error);
    throw error;
  }
}