import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface DataResetPassword{
  email: string,
  token: string,
  newPassword: string
}

export default async function ConfirmResetPassword(dataResetPassword: DataResetPassword) {
  console.log("dataResetPassword > ", dataResetPassword);
  
  const domain = await AsyncStorage.getItem('domain')
  if(!domain){
    throw new Error('Domínio ou porta não encontrados no AsyncStorage');
  }
  try{
    const url = `${domain}/resetpassword/confirm-reset`
    console.log("url reset pass > ", url);
    const response = await axios.post(url, dataResetPassword, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch(e){
    console.error('Erro ao enviar a solicitação de reset', e);
    throw e;
  } 
}