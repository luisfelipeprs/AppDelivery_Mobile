import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RegisterConsumer from '@/services/RegisterConsumer';
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

export default function ConsumerForm() {
  const [consumerData, setConsumerData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    dateOfBirth: '',
  });
  const { signIn } = useSession();

  const handleInputChange = (field: string, value: string) => {
    setConsumerData({ ...consumerData, [field]: value });
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyD6s-ANYihojvPFSAhOuIpCKpknzNg6Bts';

  const handlePlaceSelect = (data: any, details: PlaceDetails | null) => {
    if (details) {
      const { lat, lng } = details.geometry.location;

      const address = details.address_components.find(component =>
        component.types.includes('route')
      )?.long_name || '';
      
      setConsumerData({
        ...consumerData,
        address,
      });
    }
  };

  const handleSubmit = async () => {
    const dataToSend = {
      name: consumerData.name,
      email: consumerData.email,
      password: consumerData.password,
      phone: consumerData.phone,
      address: consumerData.address,
      dateOfBirth: consumerData.dateOfBirth,
    };

    try {
      console.log("data > ",dataToSend);
      
      const response = await RegisterConsumer(dataToSend);
      const userData = {
        id: response.id,
        typeAccount: response.role,
        email: response.email,
        nome: response.name,
      };

      signIn(userData);
      router.replace("/");
      console.log('Consumidor registrado com sucesso:', response);
    } catch (error) {
      console.error('Erro ao registrar consumidor:', error);
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
          <Text className="text-6xl font-extrabold text-white mt-32 tracking-wide">
            Delivery<Text className="text-[#130a8f]">Já</Text>
          </Text>
        </View>

        <TextInput
          placeholder="Nome Completo"
          value={consumerData.name}
          onChangeText={(text) => handleInputChange('name', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="E-mail"
          value={consumerData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Telefone"
          value={consumerData.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          value={consumerData.password}
          onChangeText={(text) => handleInputChange('password', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Data de Nascimento (AAAA-MM-DD)"
          value={consumerData.dateOfBirth}
          onChangeText={(text) => handleInputChange('dateOfBirth', text)}
          className="p-4 mb-4 border border-gray-300 rounded bg-white/90 shadow-md"
          placeholderTextColor="#888"
        />

        <GooglePlacesAutocomplete
          placeholder="Endereço"
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
          className="bg-blue-500 p-4 rounded mb-16 shadow-lg"
        >
          <Text className="text-white text-center text-lg">Registrar Consumidor</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin}>
          <Text className="text-center text-white mb-14">
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
