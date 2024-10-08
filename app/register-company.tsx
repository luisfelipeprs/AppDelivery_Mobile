import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RegisterCompany from '@/services/RegisterCompany';
import { useSession } from './ctx';

interface AddressComponent {
  long_name: string;
  types: string[];
}

interface PlaceDetails {
  address_components: AddressComponent[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export default function BasicInfoForm() {
  const [companyData, setCompanyData] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    typeCompany: '',
    cep: '',
    street: '',
    numberLocation: '',
    neighborhood: '',
    city: '',
    state: '',
    latitude: '',
    longitude: '',
  });
  const { signIn } = useSession();
  const handleInputChange = (field: string, value: string) => {
    setCompanyData({ ...companyData, [field]: value });
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyD6s-ANYihojvPFSAhOuIpCKpknzNg6Bts';

  // Função para extrair dados do endereço selecionado
  const handlePlaceSelect = (data: any, details: PlaceDetails | null) => {
    if (details) {
      const { lat, lng } = details.geometry.location;

      const street = details.address_components.find(component =>
        component.types.includes('route')
      )?.long_name || '';

      const city = details.address_components.find(component =>
        component.types.includes('locality')
      )?.long_name || '';

      const state = details.address_components.find(component =>
        component.types.includes('administrative_area_level_1')
      )?.long_name || '';

      const neighborhood = details.address_components.find(component =>
        component.types.includes('sublocality')
      )?.long_name || '';

      // Atualizando os dados de endereço
      setCompanyData({
        ...companyData,
        street,
        city,
        state,
        neighborhood,
        latitude: lat.toString(),
        longitude: lng.toString(),
      });
    }
  };

  const handleSubmit = async () => {
    const dataToSend = {
      name: companyData.name,
      cnpj: companyData.cnpj,
      email: companyData.email,
      phone: companyData.phone,
      password: companyData.password,
      typeCompany: companyData.typeCompany,
      cep: companyData.cep,
      street: companyData.street,
      numberLocation: companyData.numberLocation,
      neighborhood: companyData.neighborhood,
      city: companyData.city,
      state: companyData.state,
      latitude: parseFloat(companyData.latitude),
      longitude: parseFloat(companyData.longitude),
      active: true,
    };
  
    try {
      console.log(dataToSend);
      
      const response = await RegisterCompany(dataToSend);
      const userData = {
        id: response.id,
        typeAccount: response.role,
        email: response.email,
        nome: response.name,
      };

      signIn(userData);
      router.replace("/")
      console.log('Empresa registrada com sucesso:', response);

    } catch (error) {
      console.error('Erro ao registrar empresa:', error);
    }
  };
  

  return (
    <View className="flex-1 relative">
      <Image
        source={{ uri: 'https://img.freepik.com/fotos-gratis/delicioso-hamburguer-com-ingredientes-frescos_23-2150857908.jpg' }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <View className="flex-1 justify-center p-6 bg-black/50 backdrop-blur-md">
        <View className="mb-8 items-center">
          <Text className="text-6xl font-extrabold text-white mt-4 tracking-wide">
            Delivery<Text className="text-[#130a8f]">Já</Text>
          </Text>
        </View>

        <TextInput
          placeholder="Nome Completo"
          value={companyData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="CNPJ"
          value={companyData.cnpj}
          onChangeText={(text) => handleInputChange('cnpj', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="E-mail"
          value={companyData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Telefone"
          value={companyData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={companyData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Confirmar Senha"
          secureTextEntry
          value={companyData.confirmPassword}
          onChangeText={(text) => handleInputChange('confirmPassword', text)}
          className="p-4 mb-6 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Tipo de Empresa"
          value={companyData.typeCompany}
          onChangeText={(text) => handleInputChange('typeCompany', text)}
          className="p-4 mb-6 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <GooglePlacesAutocomplete
          placeholder="Endereço de entrega"
          fetchDetails={true}
          onPress={handlePlaceSelect}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'pt',
          }}
          styles={autocompleteStyles}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-500 p-4 rounded mb-4 shadow-lg"
        >
          <Text className="text-white text-center text-lg">Registrar Empresa</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text className="text-center text-white">
            Já tem uma conta? <Text className="text-blue-300">Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const autocompleteStyles = {
  textInputContainer: {
    backgroundColor: 'transparent',
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
};